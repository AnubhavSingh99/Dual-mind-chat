# ## Project Overview

F1 Expert Chat is a web-based chatbot application that provides## Example Use Cases

- Ask for technical F1 analysis (Analyst mode):  
  "How does DRS work in Formula 1?"
- Ask about F1 circuits (Driver mode):  
  "What circuits are in Monaco?" or "Tell me about Albert Park"
- Enable Detailed Analysis for step-by-step explanations.with expert-level answers about Formula 1 racing. The app features two distinct AI personas:
- **Analyst Mode:** Uses Google Gemini (Gemini 2.5 Flash) for technical, statistical, and historical F1 analysis.
- **Driver Mode:** Uses a custom-trained F1 model (`Anubhav99x/F1_Expert_LM`) hosted on Hugging Face, specifically trained on F1 circuit data to provide specialized racing insights.

The user can toggle between these modes and also enable a "Detailed Analysis" feature for more in-depth, step-by-step explanations.rt Chat: Dual-Model Formula 1 Conversational AI

## Project Overview

F1 Expert Chat is a web-based chatbot application that provides users with expert-level answers about Formula 1 racing. The app features two distinct AI personas:
- **Analyst Mode:** Uses Google Gemini (Gemini 2.5 Flash) for technical, statistical, and historical F1 analysis.
- **Driver Mode:** Uses a custom-trained F1 model (hosted on Hugging Face) to answer as a Formula 1 driver, providing first-person, experience-based responses.

The user can toggle between these modes and also enable a “Detailed Analysis” feature for more in-depth, step-by-step explanations.

---

## Key Features

- **Dual AI Model Integration:** Analyst mode uses Gemini; Driver mode uses your custom Hugging Face model trained on F1 data.
- **Mode Toggle:** Users can switch between Analyst and Driver personas.
- **Detailed Analysis Toggle:** Users can request more detailed, step-by-step answers.
- **Modern UI:** Built with Next.js, React, Tailwind CSS, and Radix UI for a clean, responsive interface.
- **Context-Aware Chat:** Maintains conversation history for more relevant, context-driven responses.
- **Custom Prompts:** Each mode uses tailored prompts to ensure accurate persona emulation.

---

## Technical Stack

- **Frontend:** Next.js (React, TypeScript), Tailwind CSS, Radix UI
- **Backend:** Next.js API routes, Genkit for AI orchestration
- **AI Models:**
  - **Gemini (GoogleAI):** For Analyst mode
  - **Custom F1 Expert Model (Anubhav99x/F1_Expert_LM):** For Driver mode via Hugging Face Gradio API
- **Other:** Zod for validation, React Hook Form, dotenv for environment variables

---

## Project Structure

```
/src
  /ai
    genkit.ts                # AI model configuration (Gemini & Hugging Face)
    /flows
      context-aware-response.ts  # Analyst mode flow (Gemini)
      custom-response.ts         # Driver mode flow (Hugging Face)
  /app
    page.tsx                 # Main chat page
    actions.ts               # Server actions for chat logic
  /components
    chat-header.tsx          # Header with mode toggles
    chat-messages.tsx        # Message list
    chat-input-form.tsx      # Input form
    ...
  /hooks
  /lib
  ...
.env                         # API keys and environment variables
package.json                 # Dependencies and scripts
```

---

## How It Works

1. **User Interface:** User enters a question and selects a mode (Analyst/Driver) and optionally enables Detailed Analysis.
2. **Routing:** The backend routes the question to the appropriate AI model:
   - Analyst → Gemini (GoogleAI)
   - Driver → F1 Expert Model (`Anubhav99x/F1_Expert_LM`) via Hugging Face Gradio API
3. **Prompt Engineering:** Each mode uses a custom prompt to ensure the correct persona and response style.
4. **Response:** The AI’s answer is displayed in the chat, maintaining conversation context.

---

## Custom Model Integration

- The custom F1 Expert model (`Anubhav99x/F1_Expert_LM`) is hosted on Hugging Face and accessed via the Gradio API.
- The model is specifically trained on Formula 1 circuit data, providing specialized knowledge about F1 tracks and racing.
- API communication is handled through axios with proper error handling and timeouts.
- The integration includes fallback responses in case of API failures.

---

## Example Use Cases

- Ask for technical F1 analysis (Analyst mode):  
  “How does DRS work in Formula 1?”
- Ask for a driver’s perspective (Driver mode):  
  “What’s it like to race at Monaco?”
- Enable Detailed Analysis for step-by-step explanations.

---

## Deployment & Running

1. **Install dependencies:**  
   `npm install`
3. **Set environment variables:**  
   - `GOOGLE_API_KEY` for Gemini  
   - F1 Expert Model is accessed via public Hugging Face Gradio API (no additional keys required)
3. **Run the app:**  
   `npm run dev`
4. **Access:**  
   Open [http://localhost:9002](http://localhost:9002)

---

## Future Enhancements

- Add user authentication and chat history.
- Support for more F1 personas (engineer, commentator, etc.).
- Analytics dashboard for chat usage.
- Real-time F1 data integration (live race stats, news).

---

## References

- [Google Gemini API](https://ai.google.dev/)
- [Hugging Face Inference API](https://huggingface.co/inference-api)
- [SmolLM3-3B Model Card](https://huggingface.co/HuggingFaceTB/SmolLM3-3B)
