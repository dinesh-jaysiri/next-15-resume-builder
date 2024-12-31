import ResumePreview from "@/components/ResumePreview";
import { resumeSchemaValues } from "@/lib/schema";
import React from "react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

interface Props {
  resumeData: resumeSchemaValues;
  setResumeData: (data: resumeSchemaValues) => void;
  className?:string;
}

function ResumePreviewSection({ resumeData, setResumeData,className }: Props) {
  return (
    <div className={cn("group relative hidden w-full md:w-1/2 md:flex",className)}>
      <div className=" absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
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
