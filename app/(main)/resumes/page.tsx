import { auth } from "@/auth";
import prisma from "@/prisma/client";
import React from "react";
import ResumeItem from "./ResumeItem";
import { resumeDataInclude } from "@/lib/types";
import CreateResumesButton from "./CreateResumesButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permission";

async function page() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) return null;

  const [ressumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: { userId: user.id },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId: user.id } }),
    getUserSubscriptionLevel(session?.user.id!),
  ]);

  // TODO: check quata for non-primiumn users

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumesButton
        canCreate={canCreateResume(subscriptionLevel, totalCount)}
      />

      <div className="space-y-6">
        <h1 className="text-3xl">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {ressumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}

export default page;
