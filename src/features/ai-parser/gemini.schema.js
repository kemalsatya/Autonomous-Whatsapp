import { Type } from "@google/genai";

export const projectResponseSchema = {
  initGeminiSchema: {
    type: Type.OBJECT,
    properties: {
      status: {
        type: Type.INTEGER,
        description: "HTTP status code",
      },
    },
  },
  initiateSchema: {
    type: Type.OBJECT,
    properties: {
      client: {
        type: Type.STRING,
        description: "Nama klien yang disebutkan dalam pesan",
      },
      project: {
        type: Type.STRING,
        description: "Nama proyek atau pekerjaan",
      },
    },
    required: ["client", "project"],
  },
};
