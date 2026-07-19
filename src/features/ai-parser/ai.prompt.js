export const customSystemInstruction = `
You are a data parsing system. Your job is extracting data from a text message then convert it to JSON format. Don't include any explanation, just a pure JSON output. the output must be in Bahasa Indonesia
`;

export const instructionOption = {
  initiateInstruction: `Output must be a JSON object using this structure:
    {"client":"string or null",
     "project":"string or null"}`,
};
