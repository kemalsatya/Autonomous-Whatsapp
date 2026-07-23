import { describe, it, expect, vi, beforeEach } from "vitest";
import { processInitiateProject } from "../src/features/whatsapp/whatsapp.service.js";

// ==========================================
// 1. MOCKING NEONDB (The Database)
// ==========================================
// We tell Vitest to replace the entire neondb.client.js file with our fake version.
// The real 'sql' is a function. We replace it with vi.fn() so it does nothing
// but simply pretends the insert was successful.
vi.mock("../neondb/neondb.client.js", () => {
  const mockSql = vi.fn().mockResolvedValue([{ id: 1 }]);
  return { sql: mockSql };
});

// ==========================================
// 2. MOCKING AI PARSER (The Internal Module)
// ==========================================
// We replace the ai.service.js file so it never actually uses the Groq API.
vi.mock("../ai-parser/ai.service.js", () => {
  return {
    parseMessageToJSON: vi.fn(),
  };
});

// Now we import the specific mocked functions so we can control them during our tests.
import { sql } from "../src/features/neondb/neondb.client.js";
import { parseMessageToJSON } from "../src/features/ai-parser/ai.service.js";
import { instructionOption } from "../src/features/ai-parser/ai.prompt.js";

describe("whatsapp.service > processInitiateProject", () => {
  beforeEach(() => {
    // Clear the history of our mocks before each test so they don't interfere
    vi.clearAllMocks();
  });

  it("should parse the message and save it to the database (Happy Path)", async () => {
    // ARRANGE
    const mockIncomingMessage =
      "Inisiasi project Web App baru untuk client ABC dan pakai spreadsheet idnya 12345";

    // Tell our fake AI parser to pretend it successfully extracted this data
    const mockParsedData = {
      client: "ABC",
      project: "Web App",
      spreadsheet_id: "12345",
    };
    parseMessageToJSON.mockResolvedValueOnce(mockParsedData);

    // ACT
    const result = await processInitiateProject(mockIncomingMessage);

    // ASSERT
    // 1. Verify the AI parser was called with the right text
    expect(parseMessageToJSON).toHaveBeenCalledTimes(1);
    expect(parseMessageToJSON).toHaveBeenCalledWith(
      mockIncomingMessage,
      instructionOption.initiateInstruction,
    );

    // 2. Verify the Database was called (meaning it tried to insert the data)
    expect(sql).toHaveBeenCalledTimes(1);

    // 3. Verify the final result returned to the user is correct
    expect(result).toEqual({ status: true, data: mockParsedData });
  });

  it("should return false and NOT touch the database if the AI fails (Unhappy Path)", async () => {
    // ARRANGE
    const mockIncomingMessage = "Inisiasi project error";
    // Simulate the AI parser throwing an error (e.g. Groq SDK is down)
    parseMessageToJSON.mockRejectedValueOnce(new Error("AI API is down"));

    // ACT
    const result = await processInitiateProject(mockIncomingMessage);

    // ASSERT
    expect(parseMessageToJSON).toHaveBeenCalledTimes(1);

    // The database should NEVER be called if the AI fails! This prevents corrupted data.
    expect(sql).not.toHaveBeenCalled();

    // The function should gracefully handle the error and return false
    expect(result).toBe(false);
  });
});
