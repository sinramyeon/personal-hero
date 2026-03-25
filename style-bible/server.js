import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sharp from "sharp";
import { GoogleGenAI } from "@google/genai";
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

// --- Lookbook generation ---
function buildLookPrompts(analysisResult) {
  const { personalColor, bodyType } = analysisResult;
  const colorSeason = personalColor?.season || "";
  const bodyDesc = bodyType?.type || "";
  const bestColors = personalColor?.bestColors?.join(", ") || "";

  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const base = `Keep this person's face and body exactly. Plain white background, no scenery. Full body visible head to toe, 1 person only, natural standing pose. Fashion lookbook style photo.`;

  return seasons.map(s => ({
    season: s,
    prompt: `${base} Wearing a stylish ${s} seasonal outfit using ${colorSeason} color palette (${bestColors}). Body type: ${bodyDesc}.`,
  }));
}

app.post("/api/generate-looks", async (req, res) => {
  try {
    const { faceImages, analysisResult, lang } = req.body;
    if (!faceImages?.length || !analysisResult) {
      return res.status(400).json({ error: "Missing face images or analysis result" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompts = buildLookPrompts(analysisResult);

    const refImages = [];
    for (const img of faceImages.slice(0, 3)) {
      try {
        const jpg = await toJpeg(img.base64);
        refImages.push({ inlineData: { mimeType: "image/jpeg", data: jpg } });
      } catch (e) {
        console.error("Face image convert failed:", e.message);
      }
    }
    if (refImages.length === 0) return res.status(400).json({ error: "No valid face images" });

    console.log(`Generating ${prompts.length} lookbook images...`);

    const results = [];
    const batchSize = 4;
    for (let i = 0; i < prompts.length; i += batchSize) {
      const batch = prompts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async ({ season, prompt }) => {
          try {
            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash-image",
              contents: [{ role: "user", parts: [...refImages, { text: prompt }] }],
              config: { responseModalities: ["TEXT", "IMAGE"] },
            });
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                return { season, image: part.inlineData.data, mimeType: part.inlineData.mimeType };
              }
            }
            return null;
          } catch (e) {
            console.error(`Generation failed for ${season}:`, e.message);
            return null;
          }
        })
      );
      results.push(...batchResults);
    }

    const looks = results.filter(Boolean);
    console.log(`Generated ${looks.length}/${prompts.length} images`);

    const grouped = {};
    for (const look of looks) {
      if (!grouped[look.season]) grouped[look.season] = [];
      grouped[look.season].push({ image: `data:${look.mimeType};base64,${look.image}` });
    }
    res.json({ looks: grouped });
  } catch (err) {
    console.error("Generation error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("API server on http://localhost:" + PORT));