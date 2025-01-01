"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { resumeSchemaValues } from "@/lib/schema";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";
import useAutoSaveResume from "./useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";

function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<resumeSchemaValues>({});
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);
  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col ">
      <header className="space-y-1.5 border-b px-3 py-5 text-center ">
        <h1 className="text-2xl font-bold"> Design your resume</h1>
        <p className="text-sm text-muted-foreground ">
          Fllow the steps below to crete your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative  grow">
        <div className="absolute bottom-0 top-0  flex w-full">
          <div
            className={cn(
              "w-full  md:w-1/2 overflow-y-auto p-2 space-y-6 pt-6 md:block",
              showSmResumePreview && "hidden"
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}

export default ResumeEditor;
