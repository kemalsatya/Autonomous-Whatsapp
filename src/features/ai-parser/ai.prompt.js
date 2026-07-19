export const customSystemInstruction = `You are a data parsing system. Your job is to extract data from a text message and convert it to a JSON format. Do NOT include any explanation or markdown — output ONLY a pure JSON object. The JSON keys must remain in English exactly as instructed.`;

export const instructionOption = {
  initiateInstruction: `
Extract the data from the message above and output a JSON object using EXACTLY this structure:
{
  "client": "string or null",
  "project": "string or null",
  "spreadsheet_id": "string or null"
}
Do not add any extra fields, comments, or explanation. Output only the JSON object.`,
};
