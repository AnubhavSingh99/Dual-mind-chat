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

const shouldIncorporateHistoryTool = ai.defineTool({
  name: 'shouldIncorporateHistory',
  description: 'Determines whether the chatbot should incorporate past conversation history into the response.',
  inputSchema: z.object({
    message: z.string().describe('The current message from the user.'),
    conversationHistory: z.array(z.string()).describe('The past conversation history.'),
  }),
  outputSchema: z.boolean().describe('Whether or not the chatbot should incorporate past conversation history into the response.'),
}, async (input) => {
  // Basic implementation: Incorporate history if it's a continuation of the conversation, otherwise, ignore.
  // A more sophisticated implementation would use semantic similarity to determine if the current message is related to the past conversation.
  const incorporate = input.conversationHistory.length > 0;
  return incorporate;
});

const contextAwareResponsePrompt = ai.definePrompt({
  name: 'contextAwareResponsePrompt',
  input: {schema: ContextAwareResponseInputSchema},
  output: {schema: ContextAwareResponseOutputSchema},
  tools: [shouldIncorporateHistoryTool],
  prompt: `You are a chatbot.
Use the shouldIncorporateHistory tool to decide if you should use the conversation history.

If the tool returns true, you are having a conversation with a user. Here is the conversation history: {{{conversationHistory}}}
The user has just said: {{{message}}}
Generate a response that is relevant to the past conversation.

If the tool returns false, The user has just said: {{{message}}}. Generate a response.
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
