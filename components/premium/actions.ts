"use server";

import { auth } from "@/auth";
import stripe from "@/lib/stripe";

export async function createCheckoutSessioin(PriceId: string) {
  const authSession = await auth();

  if (!authSession?.user) throw new Error("Unauthenticated");

  const stripeCustomerId = authSession.user.stripeId;

  const seesion = await stripe.checkout.sessions.create({
    line_items: [{ price: PriceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId || undefined,
    customer_email: stripeCustomerId ? undefined : authSession.user.email!,
    metadata: {
      userId: authSession.user.id!,
    },
    subscription_data: {
      metadata: {
        userId: authSession.user.id!,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read AIresume Builder's [terms of service](${process.env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them.`,
      },
    },

    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!seesion.url) {
    throw new Error("faild to create checkout session");
  }

  return seesion.url;
}
