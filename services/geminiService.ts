
import { GoogleGenAI } from "@google/genai";

export const getStudyTips = async (subjects: string[]) => {
  try {
    // Initializing Gemini client as per SDK guidelines: const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am a student studying the following subjects: ${subjects.join(', ')}. 
      Can you provide 3-4 short, encouraging, and specific study tips for these subjects? 
      Keep it very simple and friendly for a student.`,
      config: {
        systemInstruction: "You are a friendly, expert study coach for school students.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching study tips:", error);
    return "Stay focused, take small breaks, and remember to stay hydrated!";
  }
};
