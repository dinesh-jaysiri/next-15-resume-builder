import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";
import React from "react";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseCustomizations } from "@/lib/permission";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface Props {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

function BorderStyleButton({ borderStyle, onChange }: Props) {
  const subscriptionLevel = useSubscriptionLevel();
  const primiumModle = usePremiumModal();
  const handleClick = () => {
    if (!canUseCustomizations(subscriptionLevel)) {
      primiumModle.setOpen(true);
    }
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;

    onChange(borderStyles[nextIndex]);
  };

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
      ? Circle
      : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}

export default BorderStyleButton;
