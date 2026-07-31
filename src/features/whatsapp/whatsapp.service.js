import {
  appScriptInstruction,
  sendToAppScript,
} from "#@/appscript/app_script.service.js";
import { instructionOption } from "#@/ai-parser/ai.prompt.js";
import { parseMessageToJSON } from "#@/ai-parser/ai.service.js";

export const processRegister = async (message, originalBody) => {
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
};

export const processAttendance = async (message, originalBody) => {
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
};

export const processMoving = async (message, originalBody) => {
  const dataMovedPerson = await parseMessageToJSON(
    originalBody,
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
};

// Helper

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 
 * [FUNGSI] Menahan process selama 3 detik setelah selesai dieksekusi
 */
export const executeWithDelay = async (process, ...args) => {
  try {
    return await process(...args);
  } finally {
    await delay(3000);
  }
};
