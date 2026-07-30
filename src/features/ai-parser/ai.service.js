import Groq from "groq-sdk";
import "dotenv/config";
import { customSystemInstruction } from "./ai.prompt.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const parseMessageToJSON = async (pesanMasuk, _instruksi, _custom) => {
  let modelUsed = "llama-3.3-70b-versatile";
  // let modelUsed = "openai/gpt-oss-20b";
  let Response_formatUsed = { type: "json_object" };

  if (_custom && _custom.model == "medium") {
    Response_formatUsed = {
      type: "json_schema",
      json_schema: _custom.customSchema,
    };
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: customSystemInstruction,
        },
        {
          role: "user",
          content: `${pesanMasuk}\n\n---\n${_instruksi}`,
        },
      ],
      model: modelUsed,
      temperature: 0,
      response_format: Response_formatUsed,
    });

    const rawResponse = completion.choices[0].message.content;
    return JSON.parse(rawResponse);
  } catch (error) {
    console.error("[LOG] error on groq parser: ", error);
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

    if (ping.choices[0].message.content) {
      console.log("[LOG] Groq parser service is ready to go!");
    }
  } catch (error) {
    console.log(
      "[LOG] Groq parser service is not ready to go:\n",
      error.message,
    );
  }
};

