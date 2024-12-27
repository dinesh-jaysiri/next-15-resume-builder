import ResumePreview from "@/components/ResumePreview";
import { resumeSchemaValues } from "@/lib/schema";
import React from "react";

interface Props {
  resumeData: resumeSchemaValues;
  setResumeData: (data: resumeSchemaValues) => void;
}

function ResumePreviewSection({ resumeData, setResumeData }: Props) {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}

export default ResumePreviewSection;
