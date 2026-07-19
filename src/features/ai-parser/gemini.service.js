import { GoogleGenAI } from "@google/genai";
import { customSystemInstruction } from "./gemini.prompt.js";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const aiModel = "gemini-2.0-flash";

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

export const initializeGeminiStudio = async () => {
  try {
    const ping = await ai.models.generateContent({
      model: aiModel,
      contents: "ping",
    });
    // console.log("Gemini Studio service ready to go!");
    console.log(ping.text);
  } catch (e) {
    console.log("Gemini Studio service is not ready");
    console.error("error name: ", e.name);
    console.error("error message: ", e.message);
  }
};
