import { config } from 'dotenv';
config();

// Import our two separate flows - one for Analyst mode and one for Driver mode
import '@/ai/flows/context-aware-response.ts'; // Uses analystAI model
import '@/ai/flows/custom-response.ts'; // Uses driverAI model