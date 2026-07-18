import { client } from "./whatsapp.client";

client.on("message", async (message) => {
  const messageBody = message.body.trim().toLowerCase();
  switch (messageBody.startsWith) {
    case "inisiasi":
      break;
    case "tambah":
      break;
    case "hapus":
      break;
    case "laporan":
      break;
    default:
      break;
  }
});

client.on("message_edit", async (message) => {});
