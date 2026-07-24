export const customSystemInstruction = `You are a data parsing system. Your job is to extract data from a text message based on the rules provided.`;

export const instructionOption = {
  initiateInstruction: `Extract the client name, project name, and spreadsheet_id from the message above.`,

  registerInstruction: `
Extract the person's data. 
Rules:
- "nama" is always Pascal Case. Add spaces between words. Do not remove any words, letters, or numbers.
- "kelompok" MUST be one of: ["TMII 1", "TMII 2", "G1", "G2"] (map "taman mini" to TMII, and "gamprit" to G).
- "jenis_kelamin" MUST be "L" (laki-laki/men) or "P" (perempuan/women).
`,

  insertAttendanceInstruction: `
Extract the attendance data.
Rules:
- "tanggal" is just the date number (e.g., "4", "13", "25").
- "l" = laki-laki/men, "p" = perempuan/women.
- Categories: "h" = hadir (present), "s" = sakit (sick), "i" = izin (permission), "a" = alpha/absen (absent).
- "kelompok" MUST be one of: ["TMII 1", "TMII 2", "G1", "G2"] (map "taman mini"/tm to TMII, and "gamprit" to G).
- IMPORTANT: Pay close attention to the header. If the message starts with a status like "Izin" or "Sakit", categorize ALL listed names under that status ("i" or "s") unless explicitly stated otherwise next to a name.

Example Input:
tanggal 13
hadir
laki-laki
- man1 g1
izin
perempuan
- women2 tm2

Example Output:
{"tanggal":"13","l":{"h":[{"nama":"man1","kelompok":"G1"}],"s":[],"i":[],"a":[]},"p":{"h":[],"s":[],"i":[{"nama":"women2","kelompok":"TMII 2"}],"a":[]}}
`,
};
