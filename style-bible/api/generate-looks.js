export const config = { maxDuration: 120 };

import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";

async function toJpeg(base64Data, maxSize = 512) {
  const buf = Buffer.from(base64Data, "base64");
  const out = await sharp(buf)
    .jpeg({ quality: 70 })
    .resize({ width: maxSize, height: maxSize, fit: "inside", withoutEnlargement: true })
    .toBuffer();
  return out.toString("base64");
}

function buildPrompts(analysisResult) {
  const { personalColor, bodyType } = analysisResult;
  const color = personalColor?.season || "";
  const best = personalColor?.bestColors?.slice(0, 3).join(",") || "";
  const body = bodyType?.type || "";

  return ["Spring", "Summer", "Fall", "Winter"].map(s => ({
    season: s,
    prompt: `Same person. White background. Full body, 1 person, standing. ${s} outfit, ${color} palette (${best}), ${body} body type.`,
  }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { faceImages, analysisResult } = req.body;
    if (!faceImages?.length || !analysisResult) {
      return res.status(400).json({ error: "Missing face images or analysis result" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompts = buildPrompts(analysisResult);

    let refImage;
    try {
      const jpg = await toJpeg(faceImages[0].base64, 512);
      refImage = { inlineData: { mimeType: "image/jpeg", data: jpg } };
    } catch (e) {
      return res.status(400).json({ error: "Face image convert failed" });
    }

    console.log(`Generating ${prompts.length} lookbook images...`);

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
}
