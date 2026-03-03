import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sharp from "sharp";
import { SYSTEM_PROMPT } from "./prompt.js";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

async function toJpeg(base64Data) {
  const buf = Buffer.from(base64Data, "base64");
  const out = await sharp(buf)
    .jpeg({ quality: 85 })
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .toBuffer();
  return out.toString("base64");
}

async function addImages(content, label, imgs) {
  content.push({ type: "text", text: label });
  for (const img of imgs) {
    try {
      const jpg = await toJpeg(img.base64);
      content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: jpg } });
    } catch (e) {
      console.error("Image convert failed:", e.message);
    }
  }
}

app.post("/api/analyze", async (req, res) => {
  try {
    const { images } = req.body;
    if (!images || !images.face || !images.body || !images.outfit) {
      return res.status(400).json({ error: "Missing image categories" });
    }

    const content = [];
    await addImages(content, "=== FACE PHOTOS (for personal color analysis) ===", images.face);
    await addImages(content, "=== FULL BODY PHOTOS (for body type analysis) ===", images.body);
    await addImages(content, "=== FAVORITE OUTFIT PHOTOS (for style preference analysis) ===", images.outfit);
    content.push({ type: "text", text: "Analyze all the photos above and return the JSON result." });

    const n = content.filter(c => c.type === "image").length;
    console.log("Sending", n, "converted JPEG images to Claude...");
    if (n === 0) return res.status(400).json({ error: "No valid images after conversion" });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const text = response.content[0].text;
    console.log("Claude response:", text.substring(0, 200));

    let result;
    try { result = JSON.parse(text); } catch {
      const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      result = m ? JSON.parse(m[1]) : JSON.parse(text.trim());
    }
    res.json({ result });
  } catch (err) {
    console.error("Analysis error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("API server on http://localhost:" + PORT));