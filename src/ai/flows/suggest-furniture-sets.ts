'use server';

/**
 * @fileOverview A furniture set suggestion AI agent.
 *
 * - suggestFurnitureSets - A function that suggests furniture sets.
 * - SuggestFurnitureSetsInput - The input type for the suggestFurnitureSets function.
 * - SuggestFurnitureSetsOutput - The return type for the suggestFurnitureSets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFurnitureSetsInputSchema = z.object({
  stylePreferences: z
    .string()
    .describe('The user\'s style preferences (e.g., modern, rustic, minimalist).'),
  budget: z.number().describe('The user\'s budget for the furniture set.'),
  roomSize: z
    .string()
    .describe('The size of the room where the furniture will be placed (e.g., small, medium, large).'),
});
export type SuggestFurnitureSetsInput = z.infer<typeof SuggestFurnitureSetsInputSchema>;

const SuggestFurnitureSetsOutputSchema = z.object({
  suggestedSets: z.array(
    z.object({
      setName: z.string().describe('The name of the suggested furniture set.'),
      description: z.string().describe('A description of the furniture set.'),
      items: z.array(z.string()).describe('A list of items included in the set.'),
      estimatedPrice: z.number().describe('The estimated price of the set.'),
    })
  ).describe('A list of suggested furniture sets based on the user input.'),
});
export type SuggestFurnitureSetsOutput = z.infer<typeof SuggestFurnitureSetsOutputSchema>;

export async function suggestFurnitureSets(input: SuggestFurnitureSetsInput): Promise<SuggestFurnitureSetsOutput> {
  return suggestFurnitureSetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFurnitureSetsPrompt',
  input: {schema: SuggestFurnitureSetsInputSchema},
  output: {schema: SuggestFurnitureSetsOutputSchema},
  prompt: `You are an AI assistant that suggests furniture sets based on user preferences, budget, and room size.

  Consider the following information:
  Style Preferences: {{{stylePreferences}}}
  Budget: {{{budget}}}
  Room Size: {{{roomSize}}}

  Suggest a few furniture sets that would be suitable for the user. Provide the set name, description, items in the set and the estimated price.
  Ensure that the sets fit within the specified budget and are appropriate for the room size.

  Return the output in the format specified by the output schema.`,
});

const suggestFurnitureSetsFlow = ai.defineFlow(
  {
    name: 'suggestFurnitureSetsFlow',
    inputSchema: SuggestFurnitureSetsInputSchema,
    outputSchema: SuggestFurnitureSetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
