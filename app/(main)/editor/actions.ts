"use server";

import { auth } from "@/auth";
import { canCreateResume, canUseCustomizations } from "@/lib/permission";
import { resumeSchema, resumeSchemaValues } from "@/lib/schema";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/prisma/client";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: resumeSchemaValues) {
  const { id } = values;

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);
  const session = await auth();

  if (!session?.user) throw new Error("User not authenticatied ");

  const subscriptionLevel = await getUserSubscriptionLevel(session.user.id!);

  if(!id){
    const resumeCount = await prisma.resume.count({
      where:{userId:session.user.id}
    })

    if(!canCreateResume(subscriptionLevel, resumeCount)){
      throw new Error("Maximum resume count reached for this subscription level.")
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId: session.user.id } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations = (resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle) || (resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex)

  if(hasCustomizations && canUseCustomizations(subscriptionLevel)) {
    throw new Error("Customizatioins not allowed for this subscription level")
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume?.photoUrl);
    }

    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId: session.user.id!,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
