import React, { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import PremiumModal from "@/components/premium/PremiumModal";
import { auth } from "@/auth";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";

async function layout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session?.user) return null;

  const userSubscriptionLevel = await getUserSubscriptionLevel(
    session.user.id!
  );

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex  min-h-screen flex-col">
        <NavBar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  ); 
}

export default layout;
