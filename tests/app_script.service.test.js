import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendToAppScript } from "../src/features/appscript/app_script.service.js";

// We mock the global fetch API since we don't want to make real network requests in our unit tests
global.fetch = vi.fn();

describe("sendToAppScript", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset our mocks before each test so they don't interfere with each other
    vi.resetAllMocks();

    // Set a dummy URL for our tests
    process.env = {
      ...originalEnv,
      GOOGLE_SCRIPT_URL: "https://mock-google-script-url.com/api",
    };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it("should successfully return data when the API responds with success", async () => {
    const mockInputData = { folderName: "Test Folder", docName: "Test Doc" };
    const mockSuccessResponse = {
      ok: true,
      json: async () => ({ status: "success" }),
    };
    fetch.mockResolvedValueOnce(mockSuccessResponse);

    // 2. ACT: Call the function we are testing
    const result = await sendToAppScript(mockInputData);

    // 3. ASSERT: Verify the outcome is exactly what we expect
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://mock-google-script-url.com/api",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(mockInputData),
      }),
    );
    // The function should return the original data upon success
    expect(result).toEqual(mockInputData);
  });

  it("should throw an error when the API returns an error status", async () => {
    // 1. ARRANGE
    const mockInputData = { folderName: "Test" };
    const mockErrorResponse = {
      ok: true, 
      json: async () => ({
        status: "error",
        message: "Insufficient permissions to create folder",
      }), 
    };
    fetch.mockResolvedValueOnce(mockErrorResponse);

    // 2 & 3. ACT & ASSERT
    // We expect the function to throw an Error containing our specific message
    await expect(sendToAppScript(mockInputData)).rejects.toThrowError(
      "[LOG] error di sendToAppScript: Insufficient permissions to create folder",
    );
  });
});
