import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import ResumeItem from "./ResumeItem";
import { resumeDataInclude } from "@/lib/types";

async function page() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) return null;

  const [ressumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId: user.id },
      include:resumeDataInclude
    }),
    prisma.resume.count({ where: { userId: user.id } }),
  ]);

  // TODO: check quata for non-primiumn users

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button className="mx-auto flex w-fit" asChild>
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>

      <div className="space-y-6">
        <h1 className="text-3xl">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {ressumes.map((resume) => (
          <ResumeItem resume={resume} />
        ))}
      </div>
    </main>
  );
}

export default page;
