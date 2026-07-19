import { parseMessageToJSON } from "../ai-parser/ai.service.js";
import { instructionOption } from "../ai-parser/ai.prompt.js";

export const processInitiateProject = (pesanMasuk) => {
    const projectData = parseMessageToJSON(pesanMasuk, instructionOption.initiateInstruction)
    
}