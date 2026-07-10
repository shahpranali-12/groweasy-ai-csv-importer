import express from "express";
import multer from "multer";
import { parseCSV } from "../services/csvService";
import { askGemini } from "../services/geminiService";
import { buildPrompt } from "../prompts/crmPrompt";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Retry Gemini API up to 3 times
async function askGeminiWithRetry(prompt: string, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Gemini Attempt ${attempt}/${retries}`);

      return await askGemini(prompt);

    } catch (error) {
      console.log(`Attempt ${attempt} Failed`);

      if (attempt === retries) {
        throw error;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Gemini request failed.");
}

router.post("/", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV uploaded",
      });
    }

    console.log("CSV Received");

    const records = await parseCSV(req.file.buffer);

    console.log(`Parsed ${records.length} CSV rows`);

    const BATCH_SIZE = 10;

    let parsedRecords: any[] = [];

    let skipped = 0;

    const totalBatches = Math.ceil(records.length / BATCH_SIZE);

    for (let i = 0; i < records.length; i += BATCH_SIZE) {

      const currentBatch = i / BATCH_SIZE + 1;

      console.log(`Processing Batch ${currentBatch}/${totalBatches}`);

      const batch = records.slice(i, i + BATCH_SIZE);

      const prompt = buildPrompt(batch);

      try {

        const aiResponse = await askGeminiWithRetry(prompt);

        const cleaned = aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(cleaned);

        if (Array.isArray(parsed)) {
          parsedRecords.push(...parsed);
        } else {
          skipped += batch.length;
          console.log("Gemini returned invalid JSON array.");
        }

      } catch (error) {

        console.log(`Batch ${currentBatch} Failed`);

        skipped += batch.length;

      }
    }

    console.log("Import Finished");

    return res.json({
      success: true,
      totalRecords: records.length,
      imported: parsedRecords.length,
      skipped,
      records: parsedRecords,
    });

  } catch (error: any) {

    console.error("Import Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });

  }
});

export default router;