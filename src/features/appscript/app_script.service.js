import "dotenv/config";
export const sendToAppScript = async (data) => {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`[LOG] HTTP error, status: ${response.status}`);
    }

    const responseData = await response.json();
    if (responseData.status === "success") {
      return true;
    } else {
      throw new Error(
        `[LOG] error di sendToAppScript: ${responseData.message}`,
      );
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
