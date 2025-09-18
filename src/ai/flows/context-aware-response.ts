'use server';

/**
 * @fileOverview This flow determines whether to incorporate past interactions into the prompt.
 *
 * - contextAwareResponse - This is the main function which determines whether to incorporate details from past interactions.
 * - ContextAwareResponseInput - The input type for the contextAwareResponse function.
 * - ContextAwareResponseOutput - The return type for the contextAwareResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareResponseInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  conversationHistory: z.array(z.string()).describe('The past conversation history.'),
});
export type ContextAwareResponseInput = z.infer<typeof ContextAwareResponseInputSchema>;

const ContextAwareResponseOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
});
export type ContextAwareResponseOutput = z.infer<typeof ContextAwareResponseOutputSchema>;

const contextAwareResponsePrompt = ai.definePrompt({
  name: 'contextAwareResponsePrompt',
  input: {schema: ContextAwareResponseInputSchema},
  output: {schema: ContextAwareResponseOutputSchema},
  prompt: `You are a friendly and helpful chatbot.

{{#if conversationHistory}}
You are having a conversation with a user. Here is the conversation history:
{{#each conversationHistory}}
- {{{this}}}
{{/each}}
{{/if}}

The user has just said: "{{{message}}}"

Generate a response that is relevant to the conversation.
`,
});

const contextAwareResponseFlow = ai.defineFlow({
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
