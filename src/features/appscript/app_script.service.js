export const appScriptInstruction = {
  ping: "ping",
  register: "register",
  attendance: "attendance",
  moving: "moving",
};

export const sendToAppScript = async (data, instruksi) => {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ data, instruksi }),
    redirect: "follow",
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    console.log(response);
    throw new Error(`[LOG] HTTP error, status: ${response.status}`);
  }

  const responseData = await response.json();
  if (responseData.status === "success") {
    return true;
  } else {
    throw new Error(`[LOG] error di sendToAppScript: ${responseData.message}`);
  }
};

export const pingAppScript = async () => {
  try {
    const data = { message: "ping" };
    const ping = await sendToAppScript(data, appScriptInstruction.ping);
    if (ping) {
      console.log("[LOG] App script is ready to go");
    }
  } catch (error) {
    console.log("[LOG] App script is not ready to go:\n", error);
  }
};
