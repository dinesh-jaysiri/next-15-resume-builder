import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { resumeSchemaValues } from "@/lib/schema";
import React, { useState } from "react";
import { generateSummary } from "./actions";

interface Props {
  resumeData: resumeSchemaValues;
  onSummaryGenerated: (summary: string) => void;
}

function GenerateSummaryButton({ resumeData, onSummaryGenerated }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    // TODO: Block for non-premium users

    try {
      setIsLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleClick}
      disabled={isLoading}
    >
      Generate (AI)
    </Button>
  );
}

export default GenerateSummaryButton;
