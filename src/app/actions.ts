'use server';

import { suggestFurnitureSets, SuggestFurnitureSetsInput, SuggestFurnitureSetsOutput } from "@/ai/flows/suggest-furniture-sets";
import { z } from "zod";

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
