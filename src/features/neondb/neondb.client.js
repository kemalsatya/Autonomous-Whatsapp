import postgres from "postgres";
import "dotenv/config";

export const sql = postgres(process.env.NEONDB);

export const initializeNeonDb = async () => {
  try {
    const response = await sql`SELECT 1`;
    if (response) {
      console.log("NeonDb service is ready to go!");
    }
  } catch (error) {
    console.error("NeonDb service is not ready to go:\n" + error.message);
  }
};
