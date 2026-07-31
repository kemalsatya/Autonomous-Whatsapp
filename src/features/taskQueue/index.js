import Bottleneck from "bottleneck";

export const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 0,
});

// retry otomatis sebanyak maksimal 2x
limiter.on("failed", async (error, jobInfo) => {
  // Jika error adalah logical error dari App Script (validasi, person tidak ditemukan, dll), JANGAN retry
  if (error.message.includes("error di sendToAppScript")) {
    return;
  }

  if (jobInfo.retryCount < 2) return 1000;
});
