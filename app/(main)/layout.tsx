import React, { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import PremiumModal from "@/components/premium/PremiumModal";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex  min-h-screen flex-col">
      <NavBar />
      {children}
      <PremiumModal />
    </div>
  );
}

export default layout;
