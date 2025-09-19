'use server';

/**
 * @fileOverview This flow handles the "Analyst" mode responses using the analystAI model.
 *
 * - contextAwareResponse - This is the main function that processes F1 analyst responses.
 * - ContextAwareResponseInput - The input type for the contextAwareResponse function.
 * - ContextAwareResponseOutput - The return type for the contextAwareResponse function.
 */

import {analystAI} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareResponseInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  conversationHistory: z.array(z.string()).describe('The past conversation history.'),
  systemPrompt: z.string().optional().describe('Optional system prompt to control response style.'),
});
export type ContextAwareResponseInput = z.infer<typeof ContextAwareResponseInputSchema>;

const ContextAwareResponseOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
});
export type ContextAwareResponseOutput = z.infer<typeof ContextAwareResponseOutputSchema>;

const contextAwareResponsePrompt = analystAI.definePrompt({
  name: 'contextAwareResponsePrompt',
  input: {schema: ContextAwareResponseInputSchema},
  output: {schema: ContextAwareResponseOutputSchema},
  prompt: `You are an expert Formula 1 analyst and commentator with deep knowledge of F1 history, regulations, teams, drivers, tracks, technology, and current events.

Your expertise includes:
- Detailed knowledge of current and historical F1 drivers, teams, and championships
- Technical understanding of F1 cars, aerodynamics, and engineering
- Comprehensive knowledge of F1 regulations, penalties, and race procedures
- Race strategies, tire management, and pit stop tactics
- F1 tracks, their characteristics, and racing lines
- Statistics, records, and significant milestones in F1 history
- Current F1 news and developments

{{#if systemPrompt}}
Special instructions: {{{systemPrompt}}}
{{/if}}

{{#if conversationHistory}}
You are having a conversation with a user about Formula 1. Here is the conversation history:
{{#each conversationHistory}}
- {{{this}}}
{{/each}}
{{/if}}

The user has just said: "{{{message}}}"

Respond with accurate, insightful Formula 1 knowledge. If the question isn't related to Formula 1, politely steer the conversation back to F1 topics by mentioning you're an F1 specialist.
`,
});

const contextAwareResponseFlow = analystAI.defineFlow({
  name: 'contextAwareResponseFlow',
  inputSchema: ContextAwareResponseInputSchema,
  outputSchema: ContextAwareResponseOutputSchema,
}, async (input) => {
  const {output} = await contextAwareResponsePrompt(input);
  return output!;
});

export async function contextAwareResponse(input: ContextAwareResponseInput): Promise<ContextAwareResponseOutput> {
  return contextAwareResponseFlow(input);
}
