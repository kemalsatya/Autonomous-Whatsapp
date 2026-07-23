import "dotenv/config";
export const appScriptInstruction = {
  initiate: "initiate",
  register: "register",
};

export const sendToAppScript = async (data, _instruksi) => {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ data, _instruksi }),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`[LOG] HTTP error, status: ${response.status}`);
  }

  const responseData = await response.json();
  if (responseData.status === "success") {
    return true;
  } else {
    throw new Error(`[LOG] error di sendToAppScript: ${responseData.message}`);
  }
};
