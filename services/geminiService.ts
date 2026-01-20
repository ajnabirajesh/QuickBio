
import { GoogleGenAI, Type } from "@google/genai";

export const improveDeclaration = async (currentDeclaration: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite this resume declaration statement to be more professional and impactful, while keeping it short (max 2 sentences): "${currentDeclaration}"`,
    });
    return response.text || currentDeclaration;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDeclaration;
  }
};

export const suggestLanguages = async (currentLanguages: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Standardize this list of languages for a formal resume/bio-data. Input: "${currentLanguages}". Output only the comma separated list.`,
    });
    return response.text || currentLanguages;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentLanguages;
  }
};
