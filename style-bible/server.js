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

// Smaller images = fewer tokens = cheaper
async function toJpeg(base64Data, maxSize = 800) {
  const buf = Buffer.from(base64Data, "base64");
  const out = await sharp(buf)
    .jpeg({ quality: 70 })
    .resize({ width: maxSize, height: maxSize, fit: "inside", withoutEnlargement: true })
    .toBuffer();
  return out.toString("base64");
}

async function addImages(content, label, imgs) {
  content.push({ type: "text", text: label });
  for (const img of imgs) {
    try {
      const jpg = await toJpeg(img.base64, 800);
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
    await addImages(content, "[FACE]", images.face);
    await addImages(content, "[BODY]", images.body);
    await addImages(content, "[OUTFIT]", images.outfit);
    content.push({ type: "text", text: "Analyze and return JSON." });

    const n = content.filter(c => c.type === "image").length;
    console.log("Sending", n, "images to Claude...");
    if (n === 0) return res.status(400).json({ error: "No valid images" });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
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
  const color = personalColor?.season || "";
  const best = personalColor?.bestColors?.slice(0, 3).join(",") || "";
  const body = bodyType?.type || "";

  return ["Spring", "Summer", "Fall", "Winter"].map(s => ({
    season: s,
    prompt: `Same person. White background. Full body, 1 person, standing. ${s} outfit, ${color} palette (${best}), ${body} body type.`,
  }));
}

app.post("/api/generate-looks", async (req, res) => {
  try {
    const { faceImages, analysisResult } = req.body;
    if (!faceImages?.length || !analysisResult) {
      return res.status(400).json({ error: "Missing face images or analysis result" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompts = buildLookPrompts(analysisResult);

    // Only 1 face reference image to save tokens
    let refImage;
    try {
      const jpg = await toJpeg(faceImages[0].base64, 512);
      refImage = { inlineData: { mimeType: "image/jpeg", data: jpg } };
    } catch (e) {
      return res.status(400).json({ error: "Face image convert failed" });
    }

    console.log(`Generating ${prompts.length} lookbook images...`);

    // Sequential to avoid rate limits, 1 image at a time
    const results = [];
    for (const { season, prompt } of prompts) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: [{ role: "user", parts: [refImage, { text: prompt }] }],
          config: { responseModalities: ["IMAGE"] },
        });
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            results.push({ season, image: part.inlineData.data, mimeType: part.inlineData.mimeType });
            break;
          }
        }
      } catch (e) {
        console.error(`Generation failed for ${season}:`, e.message);
      }
    }

    console.log(`Generated ${results.length}/${prompts.length} images`);

    const grouped = {};
    for (const r of results) {
      if (!grouped[r.season]) grouped[r.season] = [];
      grouped[r.season].push({ image: `data:${r.mimeType};base64,${r.image}` });
    }
    res.json({ looks: grouped });
  } catch (err) {
    console.error("Generation error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("API server on http://localhost:" + PORT));
