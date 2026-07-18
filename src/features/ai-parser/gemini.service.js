import { GoogleGenAI } from "@google/genai";
import { customSystemInstruction } from "./gemini.prompt";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const aiModel = "gemini-1.5-flash";

/**
 * Memperoses pesan whatsapp dan mengirimnya ke gemini ai studio untuk diparse
 *
 * _instruksi = instructionOption (gemini.prompt.js)
 * _instruksiResponse = projectResponseSchema (gemini.schema.js)
 */
export const processWhatsAppMessage = async (
  pesanMasuk,
  _instruksi,
  _instruksiResponse,
) => {
  const response = await ai.models.generateContent({
    model: aiModel,
    contents: _instruksi + "\n\nPesan: " + pesanMasuk,
    config: {
      systemInstruction: customSystemInstruction,
      responseMimeType: "application/json",
      responseSchema: _instruksiResponse,
    },
  });
  return JSON.parse(response.text);
};
