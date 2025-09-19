import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Configure Gemini model instance for the "Analyst" mode
export const analystAI = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

// Configure a different Gemini model instance for the "Driver" mode
// In production, you could connect to an entirely different model API
export const driverAI = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash', // Using same model but with different prompting
});
