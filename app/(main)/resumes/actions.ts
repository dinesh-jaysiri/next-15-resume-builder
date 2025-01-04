"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  const session = await auth();

  if (!session?.user) throw new Error("User not authenticated");

  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (resume?.photoUrl) {
    await del(resume.photoUrl);
  }

  await prisma.resume.delete({
    where: {
      id,
    },
  });

  revalidatePath('/resumes')
}
