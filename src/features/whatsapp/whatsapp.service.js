import {
  appScriptInstruction,
  sendToAppScript,
} from "#@/appscript/app_script.service.js";
import { instructionOption } from "#@/ai-parser/ai.prompt.js";
import { parseMessageToJSON } from "#@/ai-parser/ai.service.js";

export const processRegister = async (message, originalBody) => {
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
    message.reply(`Terdapat kesalahan:\n${error.message}`);
  }
};

export const processAttendance = async (message, originalBody) => {
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
};

export const processMoving = async (message, originalBody) => {
  try {
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
  } catch (error) {
    console.log("[LOG] Error di case pindah:\n", error.message);
    message.reply(`Terdapat kesalahan:\n${error.message}`);
  }
};
