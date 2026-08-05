import { client } from "./whatsapp.client.js";
import { helpReplyText, tempInstructions } from "./text.helper.js";
import {
  processRegister,
  processAttendance,
  processMoving,
  executeWithDelay,
} from "./whatsapp.service.js";
import { limiter } from "#@/taskQueue/index.js";

// Helper function untuk merutekan pesan agar DRY (bisa dipakai create & edit)
const routeMessage = async (message) => {
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
      // await processRegister(message, originalBody);
      limiter
        // .schedule(() => processRegister(message, originalBody))
        .schedule(() =>
          executeWithDelay(processRegister, message, originalBody),
        )
        .catch((error) => {
          console.error("[LOG] Gagal memproses daftar setelah retry:\n", error.message);
          message.reply(`Maaf, gagal menambahkan data pendaftaran setelah beberapa kali percobaan.\nDetail: ${error.message}`);
        });
      break;

    case "!tambah":
      // await processAttendance(message, originalBody);
      limiter
        // .schedule(() => processAttendance(message, originalBody))
        .schedule(() =>
          executeWithDelay(processAttendance, message, originalBody),
        )
        .catch((error) => {
          console.error("[LOG] Gagal memproses tambah setelah retry:\n", error.message);
          message.reply(`Maaf, gagal merekam data kehadiran setelah beberapa kali percobaan.\nDetail: ${error.message}`);
        });
      break;

    case "!pindah":
      // await processMoving(message, originalBody);
      limiter
        // .schedule(() => processMoving(message, originalBody))
        .schedule(() => executeWithDelay(processMoving, message, originalBody))
        .catch((error) => {
          console.error("[LOG] Gagal memproses pindah setelah retry:\n", error.message);
          message.reply(`Maaf, gagal memproses data kepindahan setelah beberapa kali percobaan.\nDetail: ${error.message}`);
        });
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
    if (!message.fromMe) {
      return;
    }
    await routeMessage(message);
  });

  client.on("message_edit", async (message, newBody, prevBody) => {
    if (!message.fromMe) {
      return;
    }

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
