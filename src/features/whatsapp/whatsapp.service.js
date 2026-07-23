import { parseMessageToJSON } from "#@/ai-parser/ai.service.js";
import { instructionOption } from "#@/ai-parser/ai.prompt.js";
import { sql } from "#@/neondb/neondb.client.js";

export const processInitiateProject = async (pesanMasuk) => {
  try {
    const projectData = await parseMessageToJSON(
      pesanMasuk,
      instructionOption.initiateInstruction,
    );
    console.log("log:\n\n[processInitiateProject] parsed data:", projectData);
    const insertToDb = await sql`
                              insert into project_spreadsheet
                              (nama_client, nama_project, spreadsheet_id)
                              values (${projectData.client}, ${projectData.project}, ${projectData.spreadsheet_id})
                              `;
    if (insertToDb) {
      console.log("[LOG] Initiate Spreadsheet Project to NeonDb Success");
    }
    const dataReturn = { status: true, data: projectData };
    return dataReturn;
  } catch (error) {
    console.error(
      "[LOG] error in processInitiateProject - whatsapp.service:\n" + error,
    );
    return { status: false, data: null };
  }
};
