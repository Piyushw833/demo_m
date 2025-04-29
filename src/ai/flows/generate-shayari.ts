'use server';

/**
 * @fileOverview Generates a personalized birthday shayari using AI.
 *
 * - generateShayari - A function that generates a shayari.
 * - GenerateShayariInput - The input type for the generateShayari function.
 * - GenerateShayariOutput - The return type for the generateShayari function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateShayariInputSchema = z.object({
  girlfriendName: z.string().describe('The name of the girlfriend.'),
  relationshipDetails: z
    .string()
    .describe('Important details and memories about the relationship.'),
});
export type GenerateShayariInput = z.infer<typeof GenerateShayariInputSchema>;

const GenerateShayariOutputSchema = z.object({
  shayari: z.string().describe('The generated birthday shayari. Ensure it rhymes and captures the sentiment.'), // Updated description
});
export type GenerateShayariOutput = z.infer<typeof GenerateShayariOutputSchema>;

export async function generateShayari(input: GenerateShayariInput): Promise<GenerateShayariOutput> { // Renamed function
  return generateShayariFlow(input); // Call renamed flow
}

const shayariPrompt = ai.definePrompt({ // Renamed prompt variable
  name: 'shayariPrompt', // Renamed prompt name
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
      shayari: z.string().describe('The generated birthday shayari. Ensure it rhymes and captures the sentiment.'), // Updated output field description
    }),
  },
  // Updated prompt to request a shayari instead of a poem
  prompt: `Write a heartfelt birthday shayari (a form of Urdu/Hindi poetry, typically 2-4 rhyming lines expressing emotion) for {{girlfriendName}}, incorporating these details about our relationship: {{relationshipDetails}}. The shayari should be romantic and suitable for a birthday gift. Ensure it rhymes well.`,
});

const generateShayariFlow = ai.defineFlow< // Renamed flow variable
  typeof GenerateShayariInputSchema,
  typeof GenerateShayariOutputSchema
>({
  name: 'generateShayariFlow', // Renamed flow name
  inputSchema: GenerateShayariInputSchema,
  outputSchema: GenerateShayariOutputSchema,
},
async input => {
  const {output} = await shayariPrompt(input); // Call renamed prompt
  // Ensure the output structure matches the schema (e.g., { shayari: '...' })
  if (output && typeof output.shayari === 'string') {
     return output;
  }
  // Handle potential errors or unexpected output formats
  console.error("Unexpected output from AI:", output);
  throw new Error("Failed to generate shayari in the expected format.");
});
