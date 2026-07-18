import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const aiModel = "gemini-1.5-flash";
