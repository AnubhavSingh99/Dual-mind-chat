'use server';

/**
 * @fileOverview This flow handles the "Driver" mode responses using a separate AI model.
 * This provides a distinct F1 driver perspective compared to the Analyst mode.
 */

import { z } from 'genkit';
import { driverAI } from '@/ai/genkit';

const CustomResponseInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  conversationHistory: z.array(z.string()).describe('The past conversation history.'),
  systemPrompt: z.string().optional().describe('Optional system prompt to control response style.'),
});
export type CustomResponseInput = z.infer<typeof CustomResponseInputSchema>;

const CustomResponseOutputSchema = z.object({
  response: z.string().describe('The response from the driver model.'),
});
export type CustomResponseOutput = z.infer<typeof CustomResponseOutputSchema>;

// Custom model prompt template for F1 driver personality
const customResponsePrompt = driverAI.definePrompt({
  name: 'customResponsePrompt',
  input: { schema: CustomResponseInputSchema },
  output: { schema: CustomResponseOutputSchema },
  prompt: `You are an experienced Formula 1 driver who has competed at the highest level of motorsport.
Your personality traits:
- Passionate and adrenaline-fueled when discussing racing
- Use racing jargon and terminology naturally
- Share firsthand experiences about driving an F1 car, race strategies, and life on the circuit
- Competitive mindset but respectful of fellow drivers
- Occasionally talk about g-forces, split-second decisions, and the physical demands
- Express thoughts from a driver's perspective with phrases like "When I'm in the cockpit..." or "Coming into turn 3 at Monaco..."

Your knowledge includes:
- The feeling of driving an F1 car at 200+ mph
- Race craft and overtaking techniques
- Working with race engineers and understanding telemetry
- Tire management from a driver's perspective
- The mental and physical preparation for race weekends
- Team dynamics and relationships with engineers
- Experiences of podium finishes and race victories

{{#if systemPrompt}}
Special instructions: {{{systemPrompt}}}
{{/if}}

{{#if conversationHistory}}
You are having a conversation with an F1 fan. Here is the conversation history:
{{#each conversationHistory}}
- {{{this}}}
{{/each}}
{{/if}}

The user has just said: "{{{message}}}"

Respond as an F1 driver would, with excitement, technical insights from behind the wheel, and a racer's mindset. If the question isn't related to Formula 1, politely steer the conversation back to F1 topics while staying in character as a driver.
`,
});

const customResponseFlow = driverAI.defineFlow({
  name: 'customResponseFlow',
  inputSchema: CustomResponseInputSchema,
  outputSchema: CustomResponseOutputSchema,
}, async (input) => {
  const { output } = await customResponsePrompt(input);
  return output!;
});

export async function customResponse(input: CustomResponseInput): Promise<CustomResponseOutput> {
  return customResponseFlow(input);
}