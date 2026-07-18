import { client } from "./whatsapp.client";
import { helpReplyText } from "./text.helper";

client.on("message", async (message) => {
  const messageBody = message.body.trim().toLowerCase();
  const messageInstruction = messageBody.split(" ")[0];

  switch (messageInstruction) {
    case "help":
      message.reply(helpReplyText);
      break;
    case "inisiasi":
      /* kirim ke genai untuk parse data jadi json seperti ini:
      {
        "client":"nama client"
        "project":"project"
      }
      */

      /* kirim data ke neondb
       */

      /* kirim data ke app script
       */
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
    // case "hapus":
    //  break;
    // case "laporan":
    //  break;
    default:
      break;
  }
});

client.on("message_edit", async (_message) => {});
