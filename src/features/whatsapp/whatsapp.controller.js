import { client } from "./whatsapp.client.js";
import { helpReplyText } from "./text.helper.js";
import { processInitiateProject } from "./whatsapp.service.js";
import { initializeNeonDb } from "#@/neondb/neondb.client.js";
import {
  appScriptInstruction,
  sendToAppScript,
} from "#@/appscript/app_script.service.js";
import { instructionOption } from "#@/ai-parser/ai.prompt.js";
import {
  createCustomResponse,
  parseMessageToJSON,
} from "#@/ai-parser/ai.service.js";
import { schemas } from "#@/ai-parser/ai.response.schema.js";

export const registerMessageHandler = () => {
  client.on("message_create", async (message) => {
    if (!message.fromMe) {
      return;
    }
    const originalBody = message.body.trim();
    const messageBody = originalBody.toLowerCase();
    const messageInstruction = messageBody.split(/\s+/)[0];

    switch (messageInstruction) {
      case "help":
        message.reply(helpReplyText);
        break;
      case "inisiasi":
        initializeNeonDb();
        const { status, data } = await processInitiateProject(originalBody);

        const isDoc = messageBody.includes("doc");
        if (isDoc) {
          try {
            const fromAppScript = await sendToAppScript(
              data,
              appScriptInstruction.initiate,
            );
            if (fromAppScript) {
              message.reply(
                `Initiate Project Success
  success: true
  client: ${data.client}
  project: ${data.project},
  ss id: ${data.spreadsheet_id}`,
              );
            }
          } catch (error) {
            message.reply(`Initiate Project Fail`);
            console.error("[LOG] Error inisiasi:\n", error.message);
          }
        }

        if (status && !isDoc) {
          console.log("[LOG] Initiate Project Success");
          message.reply("Initiate Success");
        }
        break;
      case "daftar":
        try {
          const customRegisterSchema = createCustomResponse(
            "registerSchema",
            schemas.registerSchema,
          );
          const personData = await parseMessageToJSON(
            originalBody,
            instructionOption.registerInstruction,
            customRegisterSchema,
          );
          console.log("[LOG]parsed person data:", personData);
          const fromAppScript = await sendToAppScript(
            personData,
            appScriptInstruction.register,
          );
          if (fromAppScript) {
            console.log("[LOG]: Person sudah ditambahkan");
            message.reply("Person sudah ditambahkan");
          }
        } catch (error) {
          console.error("[LOG] Error register person:\n", error.message);
        }

        break;
      case "tambah":
        try {
          const customAttendanceSchema = createCustomResponse(
            "attendanceSchema",
            schemas.attendanceSchema,
            "medium",
          );
          const attendanceData = await parseMessageToJSON(
            originalBody,
            instructionOption.insertAttendanceInstruction,
            customAttendanceSchema,
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
      case "pindah":
        /* kirim ke genai untuk parse data jadi json seperti ini:
             {
              ["nama person"]
              }
              */
        break;
      case "logout":
        await message.reply("Logging out...");
        await client.logout();
        break;
      // case "hapus":
      //  break;
      // case "laporan":
      //  break;
      default:
        break;
    }
  });

  client.on("message_edit", async (_message) => {});

  client.on("disconnected", (reason) => console.log(reason));
};

/**

assalamualaikum, ini mas kemal dapat info perkuliahan mas kemal
dari pdf ini, informasi singkatnya:
- Pembayaran UKT  = 22 Juli - 3 Agustus
- Mulai Perkuliahan = 18 Agustus 

 */
