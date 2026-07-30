import { client } from "./whatsapp.client.js";
import { helpReplyText, tempInstructions } from "./text.helper.js";
import {
  appScriptInstruction,
  sendToAppScript,
} from "#@/appscript/app_script.service.js";
import { instructionOption } from "#@/ai-parser/ai.prompt.js";
import { parseMessageToJSON } from "#@/ai-parser/ai.service.js";

export const registerMessageHandler = () => {
  client.on("message_create", async (message) => {
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
        try {
          const personData = await parseMessageToJSON(
            originalBody,
            instructionOption.registerInstruction,
          );
          console.log("[LOG] parsed person data:", personData);
          const fromAppScript = await sendToAppScript(
            personData,
            appScriptInstruction.register,
          );
          if (fromAppScript) {
            console.log("[LOG] Person sudah ditambahkan");
            message.reply("Person sudah ditambahkan");
          }
        } catch (error) {
          console.error("[LOG] Error register person:\n", error.message);
        }
        break;
      case "!tambah":
        try {
          const attendanceData = await parseMessageToJSON(
            originalBody,
            instructionOption.insertAttendanceInstruction,
          );
          console.log("[LOG] parsed person attendance data:", attendanceData);
          const fromAppScript = await sendToAppScript(
            attendanceData,
            appScriptInstruction.attendance,
          );
          if (fromAppScript) {
            console.log("[LOG] data kehadiran berhasil ditambahkan");
            message.reply("Data kehadiran berhasil ditambahkan");
          }
        } catch (error) {
          console.log("[LOG] Error di case tambah:\n", error.message);
          message.reply(`Terdapat kesalahan:\n${error.message}`);
        }
        break;
      case "!pindah":
        try {
          const dataMovedPerson = await parseMessageToJSON(
            messageBody,
            instructionOption.movedPersonInstruction,
          );
          console.log("[LOG] data moved person: ", dataMovedPerson);
          const fromAppScript = await sendToAppScript(
            dataMovedPerson,
            appScriptInstruction.moving,
          );
          if (fromAppScript) {
            console.log("[LOG] data person yang pindah selesai dihapus");
            message.reply("Data kepindahan person sudah ditangani");
          }
        } catch (error) {
          console.log("[LOG] Error di case pindah:\n", error.message);
          message.reply(`Terdapat kesalahan:\n${error.message}`);
        }
        break;
      case "!logout":
        await message.reply("Logging out...");
        await client.logout();
        break;
      default:
        break;
    }
  });

  client.on("message_edit", async (_message) => {});

  client.on("disconnected", (reason) => console.log(reason));
};
