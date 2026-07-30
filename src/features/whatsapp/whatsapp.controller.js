import { client } from "./whatsapp.client.js";
import { helpReplyText, tempInstructions } from "./text.helper.js";
import {
  processRegister,
  processAttendance,
  processMoving,
} from "./whatsapp.service.js";

// Helper function untuk merutekan pesan agar DRY (bisa dipakai create & edit)
const routeMessage = async (message) => {
  // Hanya memproses pesan dari nomor bot sendiri
  if (!message.fromMe) {
    return;
  }

  const originalBody = message.body.trim();
  const messageBody = originalBody.toLowerCase();
  const messageInstruction = messageBody.split(/\s+/)[0];

  switch (messageInstruction) {
    case "!help":
      message.reply(helpReplyText);
      break;

    case "!template":
      const tempInstruction = messageBody.split(/\s+/)[1];
      switch (tempInstruction) {
        case "!daftar":
          message.reply(tempInstructions.tempRegisterInstructions);
          break;
        case "!tambah":
          message.reply(tempInstructions.tempAttendanceInstructions);
          break;
        case "!pindah":
          message.reply(tempInstructions.tempMovingInstructions);
          break;
      }
      break;

    case "!daftar":
      await processRegister(message, originalBody);
      break;

    case "!tambah":
      await processAttendance(message, originalBody);
      break;

    case "!pindah":
      await processMoving(message, originalBody);
      break;

    case "!logout":
      await message.reply("Logging out...");
      await client.logout();
      break;

    default:
      break;
  }
};

export const registerMessageHandler = () => {
  client.on("message_create", async (message) => {
    await routeMessage(message);
  });

  client.on("message_edit", async (message, newBody, prevBody) => {
    if (newBody) {
      message.body = newBody;
    }

    console.log(
      `[LOG] Pesan diedit dari "${prevBody}" menjadi "${message.body}"`,
    );
    await routeMessage(message);
  });

  client.on("disconnected", (reason) => console.log(reason));
};
