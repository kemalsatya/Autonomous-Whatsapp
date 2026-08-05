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
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      (process.platform === "win32"
        ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
        : undefined),
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--no-zygote",
      "--disable-gpu",
      "--disable-blink-features=AutomationControlled",
    ],
    webVersionCache: { type: "none" },
  },
});

export const initializeWhatsApp = async () => {
  client.on("qr", async (qr) => {
    const qrString = await QRCode.toString(qr, { type: "terminal", scale: 1 });
    console.log(qrString);
  });

  client.on("authenticated", () => console.log("[LOG] QR WhatsApp di scan..."));

  client.on("ready", () => console.log("[LOG] WhatsApp service ready to go!"));

  client.initialize();
};
