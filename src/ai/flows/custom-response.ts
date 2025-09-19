'use server';

/**
 * @fileOverview This flow handles the "Driver" mode responses using the custom F1 Expert model.
 * This connects to the Anubhav99x/F1_Expert_LM model on Hugging Face with Gemini fallback.
 */

import { f1ExpertAPI } from '@/lib/f1-expert-api';
import { driverAI } from '@/ai/genkit';
import { z } from 'genkit';

export interface CustomResponseInput {
  message: string;
  conversationHistory: string[];
  systemPrompt?: string;
}

export interface CustomResponseOutput {
  response: string;
}

// Fallback Gemini prompt for when the custom model is unavailable
const CustomResponseInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  conversationHistory: z.array(z.string()).describe('The past conversation history.'),
  systemPrompt: z.string().optional().describe('Optional system prompt to control response style.'),
});

const fallbackDriverPrompt = driverAI.definePrompt({
  name: 'fallbackDriverPrompt',
  input: { schema: CustomResponseInputSchema },
  output: { schema: z.object({ response: z.string() }) },
  prompt: `You are a Formula 1 expert with specialized knowledge of F1 circuits and racing.
Focus on providing detailed information about:
- F1 circuits around the world
- Track characteristics and layouts  
- Racing history at specific venues
- Technical details about circuit design

{{#if systemPrompt}}
Special instructions: {{{systemPrompt}}}
{{/if}}

{{#if conversationHistory}}
Conversation history:
{{#each conversationHistory}}
- {{{this}}}
{{/each}}
{{/if}}

Question: "{{{message}}}"

Provide detailed F1 circuit and racing information.`,
});

export async function customResponse(input: CustomResponseInput): Promise<CustomResponseOutput> {
  try {
    // Prepare the question with context if available
    let question = input.message;
    
    // Add conversation context if available
    if (input.conversationHistory && input.conversationHistory.length > 0) {
      const recentHistory = input.conversationHistory.slice(-3); // Last 3 exchanges
      const contextString = recentHistory.join('\n');
      question = `Context: ${contextString}\n\nQuestion: ${input.message}`;
    }
    
    // Add system prompt instructions if provided
    if (input.systemPrompt) {
      question = `${input.systemPrompt}\n\n${question}`;
    }
    
    // Try the F1 Expert API first
    const response = await f1ExpertAPI.predict(question);
    
    return {
      response: response || "I'm sorry, I couldn't generate a response at the moment. Please try again."
    };
  } catch (error) {
    console.error('F1 Expert API failed, falling back to Gemini:', error);
    
    try {
      // Fallback to Gemini with F1-specific prompting
      const { output } = await fallbackDriverPrompt(input);
      return {
        response: `[Using backup F1 system] ${output?.response || "I'm having trouble accessing the specialized F1 database right now, but I can still help with general F1 questions."}`
      };
    } catch (fallbackError) {
      console.error('Fallback model also failed:', fallbackError);
      return {
        response: "I'm experiencing technical difficulties with both the F1 Expert model and backup systems. Please try again in a moment."
      };
    }
  }
}