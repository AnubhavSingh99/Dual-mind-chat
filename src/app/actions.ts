'use server';

import {
  contextAwareResponse,
  type ContextAwareResponseInput,
} from '@/ai/flows/context-aware-response';

import {
  customResponse,
  type CustomResponseInput,
} from '@/ai/flows/custom-response';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export async function continueConversation(
  history: Message[],
  mode: 'gemini' | 'custom' = 'gemini',
  thinkingMode: boolean = false
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

    // Common input for both models
    const input = {
      message: lastUserMessage.content,
      conversationHistory,
    };
    
    let result;
    
    // Add system prompt for thinking mode
    const systemPrompt = thinkingMode ? 
      "Please provide a detailed analysis with your reasoning process. Break down the question step-by-step and explain your thinking." : 
      "Provide a concise and direct answer.";
    
    if (mode === 'custom') {
      // Use the custom model with thinking mode
      result = await customResponse({
        ...input,
        systemPrompt,
      } as CustomResponseInput);
    } else {
      // Use the default Gemini model with thinking mode
      result = await contextAwareResponse({
        ...input,
        systemPrompt,
      } as ContextAwareResponseInput);
    }
    
    return { type: 'success', content: result.response };
  } catch (error) {
    console.error('AI Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during the AI call.';
    return { type: 'error', message: `Failed to get a response. ${errorMessage}` };
  }
}
