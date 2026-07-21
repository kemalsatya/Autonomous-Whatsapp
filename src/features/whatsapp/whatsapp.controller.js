import { client } from "./whatsapp.client.js";
import { helpReplyText } from "./text.helper.js";
import { processInitiateProject } from "./whatsapp.service.js";
import { initializeNeonDb } from "../neondb/neondb.client.js";
import { sendToAppScript } from "../spreadsheet/app_script.service.js";

export const registerMessageHandler = () => {
  client.on("message_create", async (message) => {
    const messageBody = message.body.trim().toLowerCase();
    const messageInstruction = messageBody.split(" ")[0];
    const originalBody = message.body.trim();

    switch (messageInstruction) {
      case "help":
        message.reply(helpReplyText);
        break;
      case "inisiasi":
        // parsing data dari groq [BERHASIL]
        // kirim data + spreadsheet id ke neondb [BERHASIL]
        // axios post ke app script** [BELUM]
        // ** membuat duplikat folder dan docs
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
          ["nama person", "kelompok", "jenis kelamin"]
          }
          */
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
