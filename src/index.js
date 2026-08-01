import express from "express";

import { initializeWhatsApp } from "./features/whatsapp/whatsapp.client.js";
import { registerMessageHandler } from "./features/whatsapp/whatsapp.controller.js";
import { initializeAiParserService } from "./features/ai-parser/ai.service.js";
import { pingAppScript } from "#@/appscript/app_script.service.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    status: "Success",
    message: "Welcome, Service is Running",
  });
});

app.listen(PORT, () => {
  console.log(`[LOG] Server is running on port ${PORT}`);
  registerMessageHandler();
  initializeWhatsApp();
  initializeAiParserService();
  pingAppScript();
});
