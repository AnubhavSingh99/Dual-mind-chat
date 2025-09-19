/**
 * @fileOverview Custom F1 Expert API service for Hugging Face Gradio integration
 * This service connects to the Anubhav99x/F1_Expert_LM model on Hugging Face
 */

import { Client } from "@gradio/client";

interface GradioResult {
  data: string[];
}

export class F1ExpertAPIService {
  private spaceName = 'Anubhav99x/F1_Expert_LM';
  
  async predict(question: string): Promise<string> {
    try {
      // Connect to the Gradio client
      const client = await Client.connect(this.spaceName);
      
      // Make prediction using the correct API format
      const result = await client.predict("/predict", { 
        question: question 
      }) as GradioResult;

      console.log('F1 Expert API Response:', result);

      if (result && result.data && result.data.length > 0) {
        return result.data[0];
      } else {
        throw new Error('Invalid response from F1 Expert API');
      }
    } catch (error) {
      console.error('F1 Expert API Error:', error);
      
      // Provide a helpful fallback message
      return `I'm currently having trouble accessing the specialized F1 circuit database. However, I can still help with general F1 questions! Please ask me about Formula 1 teams, drivers, racing techniques, or technical aspects of the sport. (Error: ${error instanceof Error ? error.message : 'Unknown error'})`;
    }
  }
}

export const f1ExpertAPI = new F1ExpertAPIService();