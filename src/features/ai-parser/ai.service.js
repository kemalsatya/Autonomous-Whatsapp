import Groq from "groq-sdk";
import "dotenv/config";
import { customSystemInstruction } from "./ai.prompt.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Memperoses pesan whatsapp dan mengirimnya ke gemini ai studio untuk diparse
 *
 * _instruksi = instructionOption (gemini.prompt.js)
 * _instruksiResponse = projectResponseSchema (gemini.schema.js)
 */
export const parseMessageToJSON = async (pesanMasuk, _instruksi) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: customSystemInstruction,
        },
        {
          role: "user",
          content: pesanMasuk + _instruksi,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const rawResponse = completion.choices[0].message.content;
    return JSON.parse(rawResponse);
  } catch (error) {
    console.error("log: error on groq parser: ", error);
    throw error;
  }
};

export const initializeAiParserService = async () => {
  try {
    const ping = await groq.chat.completions.create({
      messages: [{ role: "user", content: "ping" }],
      model: "llama-3.1-8b-instant",
      max_completion_tokens: 5,
    });

    console.log("Groq Ai: ", ping.choices[0].message.content);
    console.log("Groq parser service is ready to go!");
  } catch (error) {
    console.log("Groq parser service is not ready to go:\n", error.message);
  }
};
