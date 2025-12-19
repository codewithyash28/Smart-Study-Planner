
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudyTips = async (subjects: string[]) => {
  try {
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

export const askAiTutor = async (question: string, subjects: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The student is currently studying: ${subjects.join(', ')}. They have a doubt: "${question}"`,
      config: {
        systemInstruction: "You are a helpful, patient, and expert school tutor. Explain concepts clearly and simply so a student can easily understand. If the question is not related to studies, gently remind them to focus on their subjects.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Tutor Error:", error);
    return "Sorry, I'm having a bit of trouble connecting. Try again in a second!";
  }
};
