// generate-poem.ts
'use server';

/**
 * @fileOverview Generates a personalized birthday poem using AI.
 *
 * - generatePoem - A function that generates a poem.
 * - GeneratePoemInput - The input type for the generatePoem function.
 * - GeneratePoemOutput - The return type for the generatePoem function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GeneratePoemInputSchema = z.object({
  girlfriendName: z.string().describe('The name of the girlfriend.'),
  relationshipDetails: z
    .string()
    .describe('Important details and memories about the relationship.'),
});
export type GeneratePoemInput = z.infer<typeof GeneratePoemInputSchema>;

const GeneratePoemOutputSchema = z.object({
  poem: z.string().describe('The generated birthday poem.'),
});
export type GeneratePoemOutput = z.infer<typeof GeneratePoemOutputSchema>;

export async function generatePoem(input: GeneratePoemInput): Promise<GeneratePoemOutput> {
  return generatePoemFlow(input);
}

const poemPrompt = ai.definePrompt({
  name: 'poemPrompt',
  input: {
    schema: z.object({
      girlfriendName: z.string().describe('The name of the girlfriend.'),
      relationshipDetails: z
        .string()
        .describe('Important details and memories about the relationship.'),
    }),
  },
  output: {
    schema: z.object({
      poem: z.string().describe('The generated birthday poem.'),
    }),
  },
  prompt: `Write a heartfelt birthday poem for {{girlfriendName}}, incorporating these details about our relationship: {{relationshipDetails}}. The poem should be suitable for a birthday gift.`,
});

const generatePoemFlow = ai.defineFlow<
  typeof GeneratePoemInputSchema,
  typeof GeneratePoemOutputSchema
>({
  name: 'generatePoemFlow',
  inputSchema: GeneratePoemInputSchema,
  outputSchema: GeneratePoemOutputSchema,
},
async input => {
  const {output} = await poemPrompt(input);
  return output!;
});