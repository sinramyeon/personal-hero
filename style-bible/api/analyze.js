export const config = { maxDuration: 60 };

import Anthropic from "@anthropic-ai/sdk";
import sharp from "sharp";

const SYSTEM_PROMPT = `You are an expert personal color and body type analyst. Analyze the provided photos and return a JSON object with this exact structure (respond ONLY with valid JSON, no markdown):
{
  "personalColor": {
    "season": "string (e.g. Spring Warm, Summer Cool, Autumn Warm, Winter Cool)",
    "subtype": "string (e.g. Bright Spring, Soft Summer)",
    "description": "string",
    "bestColors": ["array of hex color codes"],
    "worstColors": ["array of hex color codes"]
  },
  "bodyType": {
    "type": "string",
    "description": "string",
    "strengths": ["array of strings"],
    "tips": ["array of strings"]
  },
  "styleRecommendation": {
    "summary": "string",
    "doList": ["array of strings"],
    "dontList": ["array of strings"]
  }
}
Respond in the same language as the labels in the photos (Korean if Korean text visible, otherwise English). Be specific with hex codes and practical with style advice.`;

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

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { images } = req.body;
    if (!images?.face || !images?.body || !images?.outfit) {
      return res.status(400).json({ error: "Missing image categories" });
    }

    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
    const content = [];

    await addImages(content, "=== FACE PHOTOS (for personal color analysis) ===", images.face);
    await addImages(content, "=== FULL BODY PHOTOS (for body type analysis) ===", images.body);
    await addImages(content, "=== FAVORITE OUTFIT PHOTOS (for style preference analysis) ===", images.outfit);
    content.push({ type: "text", text: "Analyze all the photos above and return the JSON result." });

    const n = content.filter((c) => c.type === "image").length;
    console.log("Sending", n, "images to Claude...");
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
    try {
      result = JSON.parse(text);
    } catch {
      const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      result = m ? JSON.parse(m[1]) : JSON.parse(text.trim());
    }
    res.json({ result });
  } catch (err) {
    console.error("Analysis error:", err.message);
    res.status(500).json({ error: err.message });
  }
}