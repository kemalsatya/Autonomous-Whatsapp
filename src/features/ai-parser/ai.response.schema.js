/**
 * JSON Schemas for Groq Structured Outputs
 * These schemas guarantee the exact structure of the AI's response.
 */

const initiateSchema = {
  type: "object",
  properties: {
    client: { type: ["string", "null"], description: "The name of the client" },
    project: {
      type: ["string", "null"],
      description: "The name of the project",
    },
    spreadsheet_id: {
      type: ["string", "null"],
      description: "The ID of the spreadsheet",
    },
  },
  required: ["client", "project", "spreadsheet_id"],
  additionalProperties: false,
};

const registerSchema = {
  type: "object",
  properties: {
    nama: { type: ["string", "null"], description: "Name in Pascal Case" },
    kelompok: {
      type: ["string", "null"],
      description: "Group (TMII 1, TMII 2, G1, G2)",
    },
    jenis_kelamin: { type: ["string", "null"], description: "Gender (L or P)" },
  },
  required: ["nama", "kelompok", "jenis_kelamin"],
  additionalProperties: false,
};

// Reusable schema for a single person in the attendance array
const personSchema = {
  type: "object",
  properties: {
    nama: { type: "string" },
    kelompok: { type: "string" },
  },
  required: ["nama", "kelompok"],
  additionalProperties: false,
};

// Reusable schema for attendance categories (h, s, i, a)
const categorySchema = {
  type: "object",
  properties: {
    h: { type: "array", items: personSchema, description: "Hadir (Present)" },
    s: { type: "array", items: personSchema, description: "Sakit (Sick)" },
    i: { type: "array", items: personSchema, description: "Izin (Permission)" },
    a: { type: "array", items: personSchema, description: "Alpha (Absent)" },
  },
  required: ["h", "s", "i", "a"],
  additionalProperties: false,
};

const attendanceSchema = {
  type: "object",
  properties: {
    tanggal: {
      type: ["string", "null"],
      description: "Date (e.g., '4', '13', '25')",
    },
    l: { ...categorySchema, description: "Laki-laki (Men)" },
    p: { ...categorySchema, description: "Perempuan (Women)" },
  },
  required: ["tanggal", "l", "p"],
  additionalProperties: false,
};

export const schemas = { initiateSchema, registerSchema, attendanceSchema };
