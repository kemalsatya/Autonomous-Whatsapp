import { client } from "./whatsapp.client.js";
import { helpReplyText } from "./text.helper.js";
import { processInitiateProject } from "./whatsapp.service.js";
import { initializeNeonDb } from "../neondb/neondb.client.js";

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
        const isSuccess = await processInitiateProject(originalBody);
        if (isSuccess) {
          console.log("log: Initiate Success");
          message.reply("Initiate Success");
        } else {
          console.log("log: Gagal memproses inisiasi. Cek format pesan.");
          message.reply("Gagal memproses inisiasi. Cek format pesan.");
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
