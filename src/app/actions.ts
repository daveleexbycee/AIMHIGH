
'use server';

import { suggestFurnitureSets, SuggestFurnitureSetsInput, SuggestFurnitureSetsOutput } from "@/ai/flows/suggest-furniture-sets";
import { z } from "zod";
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/welcome-email';
import { OrderConfirmationEmail, OrderConfirmationEmailProps } from "@/components/emails/order-confirmation-email";

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
        const { data, error } = await resend.emails.send({
            from: 'Aimhigh Store <onboarding@resend.dev>',
            to: [email],
            subject: 'Welcome to Aimhigh Furniture!',
            react: WelcomeEmail({ name }),
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
            from: 'Aimhigh Store <orders@resend.dev>',
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
