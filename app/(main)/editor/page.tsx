import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./ResumeEditor";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { resumeDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design your resume",
};

type searchParams = Promise<{
  resumeId: string;
}>;
interface Props {
  searchParams: searchParams;
}

async function page({ searchParams }: Props) {
  const { resumeId } = await searchParams;

  const session = await auth();

  if (!session?.user) return null;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId: session.user.id },
        include:resumeDataInclude
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}

export default page;
