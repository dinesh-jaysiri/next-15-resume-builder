"use server";
import { auth } from "@/auth";
import stripe from "@/lib/stripe";

export async function createCustomerPortalSession() {
  const authSession = await auth();

  if (!authSession?.user) {
    throw new Error("Unauthorized");
  }

  const stripeCustomerId = authSession.user.stripeId as string | undefined;

  if (!stripeCustomerId) {
    throw new Error("Stripe customer ID not found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
  });

  if (!session.url) {
    throw new Error("Failed to create customer portal session");
  }

  return session.url;
}
