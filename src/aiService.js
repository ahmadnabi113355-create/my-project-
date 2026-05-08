import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateResponse(messages) {
  try {
    // Format messages for the Gemini API
    // We filter out any empty messages, and convert roles
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage }]}
      ],
      config: {
        systemInstruction: "You are NUERA, an advanced, professional AI assistant. Keep responses helpful, concise, and professional.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm sorry, I'm having trouble connecting to my cognitive processing center right now. Please check my API configuration or try again later.";
  }
}
