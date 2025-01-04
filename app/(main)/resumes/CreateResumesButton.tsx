'use client'
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  canCreate: boolean;
}

function CreateResumesButton({ canCreate }: Props) {
  const { setOpen } = usePremiumModal();

  if (canCreate)
    return (
      <Button className="mx-auto flex w-fit" asChild>
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
    );

  return (
    <Button className="mx-auto flex w-fit" onClick={() => setOpen(true)}>
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
}

export default CreateResumesButton;
