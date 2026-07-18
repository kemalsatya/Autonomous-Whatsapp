import wwebjs from "whatsapp-web.js";
const { Client, LocalAuth } = wwebjs;
import QRCode from "qrcode";

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

export const initializeWhatsApp = async () => {
  client.on("qr", async (qr) => {
    const qrString = await QRCode.toString(qr, { type: "terminal", scale: 1 });
    console.log(qrString);
  });

  client.on("authenticated", () => console.log("di scan..."));

  client.on("ready", () => console.log("WhatsApp service ready to go!"));

  client.initialize();
};
