import Groq from "groq-sdk";
import "dotenv/config";
import { customSystemInstruction } from "./ai.prompt.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const parseMessageToJSON = async (pesanMasuk, _instruksi, _custom) => {
  let modelUsed = "llama-3.1-8b-instant";
  if (_custom.model == "medium") {
    modelUsed = "openai/gpt-oss-20b";
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
      response_format: {
        type: "json_schema",
        json_schema: _custom.customSchema,
      },
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

/**
 * @param {string} response_name
 * @param {object} response_schema -> schemas from ai.resposne.schema.js
 * @param {string} (optional) model -> "medium"
 */
export const createCustomResponse = (response_name, response_schema, model) => {
  return {
    model,
    customSchema: {
      name: response_name,
      schema: response_schema,
      strict: true,
    },
  };
};
