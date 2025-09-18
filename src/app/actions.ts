'use server';

import {
  contextAwareResponse,
  type ContextAwareResponseInput,
} from '@/ai/flows/context-aware-response';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export async function continueConversation(
  history: Message[]
): Promise<
  | { type: 'success'; content: string }
  | { type: 'error'; message: string }
> {
  try {
    const lastUserMessage = history.findLast((msg) => msg.role === 'user');
    if (!lastUserMessage) {
      return { type: 'error', message: 'No user message found.' };
    }

    const conversationHistory = history
      .slice(0, -1)
      .map(
        (msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      );

    const input: ContextAwareResponseInput = {
      message: lastUserMessage.content,
      conversationHistory,
    };
    
    const result = await contextAwareResponse(input);
    
    return { type: 'success', content: result.response };
  } catch (error) {
    console.error('AI Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during the AI call.';
    return { type: 'error', message: `Failed to get a response. ${errorMessage}` };
  }
}
