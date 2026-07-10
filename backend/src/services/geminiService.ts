 import { GoogleGenAI } from "@google/genai";

export async function askGemini(prompt: string, retries = 3): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text ?? "[]";
  } catch (error) {
    console.log(`Gemini failed. Retries left: ${retries}`);

    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return askGemini(prompt, retries - 1);
    }

    throw error;
  }
}