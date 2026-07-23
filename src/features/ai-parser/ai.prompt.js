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
  registerInstruction: `
Extraxt the data from the message above and outpus a JSON object using EXACTYLY this structure:
{
"nama": "string or null",
"kelompok": "string or null",
"jenis_kelamin": "string or null"
rules:
- value for "nama" is always pascal case with adding space between each word and without remove any word,letter,or number
- value for "kelompok" is one of this ["TMII 1", "TMII 2","G1","G2"] (taman mini -> TMII, gamprit -> G)
- value for "jenis_kelamin" is either L (for men/laki-laki) or P (for women/perempuan)
Do not add any extra fields, comments, or explanation. Output only the JSON object.
}.`,
};
