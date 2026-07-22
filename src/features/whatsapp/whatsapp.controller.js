import { client } from "./whatsapp.client.js";
import { helpReplyText } from "./text.helper.js";
import { processInitiateProject } from "./whatsapp.service.js";
import { initializeNeonDb } from "#@/neondb/neondb.client.js";
import { sendToAppScript } from "#@/appscript/app_script.service.js";
import { instructionOption } from "../ai-parser/ai.prompt.js";
import { parseMessageToJSON } from "../ai-parser/ai.service.js";

export const registerMessageHandler = () => {
  client.on("message_create", async (message) => {
    const originalBody = message.body.trim();
    const messageBody = originalBody.toLowerCase();
    const messageInstruction = messageBody.split(" ")[0];

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
            let fromAppScript = await sendToAppScript(data);
            if (fromAppScript) {
              message.reply(`Initiate Project Success
  success: true
  client: ${data.client}
  project: ${data.project},
  ss id: ${data.spreadsheet_id}`);
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
        /* kirim ke genai untuk parse data jadi json seperti ini:
         {
          ["nama", "kelompok", "jenis kelamin"]
          }
          */
        try {
          const personData = await parseMessageToJSON(
            originalBody,
            instructionOption.registerInstruction,
          );
          console.log("log:\n\nparsed person data:", personData);
        } catch (error) {
          console.error("[LOG] Error register person:\n", error.message);
        }

        break;
      case "tambah":
        /* kirim ke genai untuk parse data jadi json seperti ini:
           {
            ["nama person", "hadir/ijin/sakit/absen"]
            }
            */
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
