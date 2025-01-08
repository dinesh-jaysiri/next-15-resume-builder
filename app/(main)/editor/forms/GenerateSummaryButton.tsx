import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { resumeSchemaValues } from "@/lib/schema";
import React, { useState } from "react";
import { generateSummary } from "./actions";
import { canUseAiTools } from "@/lib/permission";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";

interface Props {
  resumeData: resumeSchemaValues;
  onSummaryGenerated: (summary: string) => void;
}

function GenerateSummaryButton({ resumeData, onSummaryGenerated }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionLevel = useSubscriptionLevel();
  const primiumModle = usePremiumModal();

  async function handleClick() {
    if (!canUseAiTools(subscriptionLevel)) {
      primiumModle.setOpen(true);
      return;
    }

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
