# **App Name**: DualMind Chat

## Core Features:

- Chat Interface: Simple UI with a message input box and conversation history display.
- Mode Toggle: Switch between Gemini and Custom Model modes using a clear toggle.
- Gemini Integration: Backend route to send prompts to the Gemini API and receive responses.
- Custom Model Integration: Utilize a custom trained model (starting with a HuggingFace or OpenAI fine-tuned model) for responses, using embeddings and vector search.
- Response Handling: Clear display of LLM responses. It will intelligently use a tool to decide whether or not to incorporate details from past interactions, so as to ensure context appropriate response
- Error Handling: Robust error handling for API failures and graceful degradation.

## Style Guidelines:

- Primary color: Strong blue (#2962FF) for a modern and trustworthy feel.
- Background color: Very light blue (#F0F5FF) to ensure readability and a clean look.
- Accent color: A shade of violet (#735CDD) for highlighting interactive elements, complementing the analogous primary hue.
- Body and headline font: 'Inter' (sans-serif) for a clean, modern, readable interface.
- Simple, clear icons for mode switching and settings.
- Clean and intuitive chat layout focused on readability and ease of use.