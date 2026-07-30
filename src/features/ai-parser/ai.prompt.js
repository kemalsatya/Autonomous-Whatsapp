export const customSystemInstruction = `You are a data parsing system. Your job is to extract data from a text message based on the rules provided.`;

const registerInstruction = `
Extract the person's data. 
Rules:
- "nama" is always Pascal Case with space between words. Extract ONLY the person's name. DO NOT include the group/kelompok in the "nama" field.
- "kelompok" MUST be one of: ["TMII 1", "TMII 2", "G1", "G2"] (map "taman mini"/tm to TMII, and "gamprit"/g to G).
- "l" is (gender for laki-laki/men), and "p" is (gender for perempuan/women).
- Pay close attention to gender headers ('perempuan', 'laki-laki'). categorize all the names strictly into the correct gender array. 
- DO NOT duplicate names. A person can ONLY be in 'l' OR 'p', never both.
- If a gender category has no names mentioned, you MUST leave its array empty ([]).

Expected JSON Output Format:
{"l": [{"nama":"Name","kelompok":"Group"}], "p": [{"nama":"Name","kelompok":"Group"}]}

Return ONLY valid JSON.
`;

const insertAttendanceInstruction = `
Extract the attendance data and return ONLY valid JSON.
Rules:
- DO NOT duplicate names. A person can ONLY be in 'l' OR 'p', never both.
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

Example JSON Output:
{"tanggal":"13","l":{"h":[{"nama":"man1","kelompok":"G1"}],"s":[],"i":[],"a":[]},"p":{"h":[],"s":[],"i":[{"nama":"women2","kelompok":"TMII 2"}],"a":[]}}
`;

const movedPersonInstruction = `
Extract person data.
Rules:
- "nama" is always Pascal Case with space between words. Extract ONLY the person's name. DO NOT include the group/kelompok in the "nama" field.
- "kelompok" MUST be one of: ["TMII 1", "TMII 2", "G1", "G2"] (map "taman mini"/tm to TMII, and "gamprit" to G).
- "l" is (laki-laki/men), and "p" is (perempuan/women).
- Pay close attention to gender headers (e.g., 'perempuan', 'laki-laki'). Categorize the names strictly into the correct gender array.
- DO NOT duplicate names. A person can ONLY be in 'l' OR 'p', never both.
- If a gender category has no names mentioned, you MUST leave its array empty ([]).

Expected JSON Output Format:
{"l": [{"nama":"Name in Pascal Case with space between words","kelompok":"Group (TMII 1, TMII 2, G1, G2)"}],
"p": [{"nama":"Name in Pascal Case with space between words","kelompok":"Group (TMII 1, TMII 2, G1, G2)"}]}
Return ONLY valid JSON.
  `;

export const instructionOption = {
  registerInstruction,
  insertAttendanceInstruction,
  movedPersonInstruction,
};
