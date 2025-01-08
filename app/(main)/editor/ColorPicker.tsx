import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
import { canUseCustomizations } from "@/lib/permission";
import usePremiumModal from "@/hooks/usePremiumModal";

interface Props {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

function ColorPicker({ color, onChange }: Props) {
  const subscriptionLevel = useSubscriptionLevel();
   const primiumModle = usePremiumModal();
  const [showPopover, setShowPopover] = useState(false);
 
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          title="Change resume color"
          size="icon"
          variant="outline"
          onClick={() => {
            if (!canUseCustomizations(subscriptionLevel)) {
              primiumModle.setOpen(true);
            }
            setShowPopover(true);
          }}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="border-none mt-3 bg-transparent shadow-none"
      >
        <TwitterPicker triangle="top-right" color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
