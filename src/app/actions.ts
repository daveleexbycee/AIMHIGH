
'use server';

import { suggestFurnitureSets, SuggestFurnitureSetsInput, SuggestFurnitureSetsOutput } from "@/ai/flows/suggest-furniture-sets";
import { z } from "zod";
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/welcome-email';
import { OrderConfirmationEmail, OrderConfirmationEmailProps } from "@/components/emails/order-confirmation-email";
import { getProducts } from "@/lib/firestore";
import { Review } from "@/hooks/use-cart";
import fetch from 'node-fetch';

const SuggestionFormSchema = z.object({
    stylePreferences: z.string().min(1, "Style preference is required."),
    budget: z.coerce.number().min(1, "Budget must be a positive number."),
    roomSize: z.string().min(1, "Room size is required."),
});

export async function getFurnitureSuggestions(
    input: SuggestFurnitureSetsInput
): Promise<{ success: boolean; data?: SuggestFurnitureSetsOutput; error?: string }> {
    const validatedInput = SuggestionFormSchema.safeParse(input);

    if (!validatedInput.success) {
        return { success: false, error: "Invalid input." };
    }

    try {
        const result = await suggestFurnitureSets(validatedInput.data);
        return { success: true, data: result };
    } catch (error) {
        console.error("AI suggestion failed:", error);
        return { success: false, error: "Failed to get suggestions. Please try again later." };
    }
}


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ email, name }: { email: string, name: string }) {
    try {
        const products = await getProducts();
        // Get all reviews that have a comment
        const allReviews = products.flatMap(p => p.reviews || []).filter((r): r is Review & { comment: string } => !!r.comment);

        // Simple shuffle and pick up to 2 reviews
        const randomReviews = allReviews.sort(() => 0.5 - Math.random()).slice(0, 2);

        const { data, error } = await resend.emails.send({
            from: 'Aimhigh Store <info@aimhigh.store>',
            to: [email],
            subject: 'Welcome to AimHigh Furniture Store 🎉',
            react: WelcomeEmail({ name, products, reviews: randomReviews }),
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send welcome email:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}


export async function sendOrderConfirmationEmail(props: OrderConfirmationEmailProps) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Aimhigh Store <orders@aimhigh.store>',
            to: [props.email],
            subject: `Your Aimhigh Order Confirmation [${props.orderId}]`,
            react: OrderConfirmationEmail(props),
        });

        if (error) {
            console.error("Resend order confirmation error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send order confirmation email:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function syncOneSignalUser({ userId, email }: { userId: string, email: string }) {
    const ONE_SIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    const ONE_SIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

    if (!ONE_SIGNAL_APP_ID || !ONE_SIGNAL_REST_API_KEY) {
        console.error("OneSignal App ID or REST API Key is not configured for user sync.");
        return { success: false, error: "OneSignal credentials not configured." };
    }

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${ONE_SIGNAL_REST_API_KEY}`
        },
        body: JSON.stringify({
          properties: {email: email},
          identity: {external_id: userId}
        })
    };

    try {
        const response = await fetch(`https://onesignal.com/api/v1/apps/${ONE_SIGNAL_APP_ID}/users`, options);
        const data = await response.json();
        console.log("OneSignal user sync response:", data);
        if (response.ok) {
            return { success: true, data };
        }
        return { success: false, error: (data as any)?.errors?.join(', ') || 'Failed to sync user with OneSignal' };
    } catch (error) {
        console.error("Error syncing user with OneSignal:", error);
        return { success: false, error: "An unexpected error occurred during user sync." };
    }
}
    