import { Client, LocalAuth } from "whatsapp-web.js";
import { qrcode } from "qrcode-terminal";

export const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "kamaelbot-wa",
    dataPath: "./wa-session",
  }),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--no-zygote",
      "--disable-gpu",
      "--disable-blink-features=AutomationControlled",
    ],
  },
});

export const initializeWhatsApp = () => {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", () => console.log("di scan..."));

  client.on("ready", () => console.log("service ready to go"));
};

client.initialize();
