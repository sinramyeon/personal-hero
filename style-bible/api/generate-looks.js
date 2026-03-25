export const config = { maxDuration: 120 };

import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";

async function toJpeg(base64Data) {
  const buf = Buffer.from(base64Data, "base64");
  const out = await sharp(buf)
    .jpeg({ quality: 90 })
    .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
    .toBuffer();
  return out.toString("base64");
}

function buildPrompts(analysisResult) {
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

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { faceImages, analysisResult, lang } = req.body;
    if (!faceImages?.length || !analysisResult) {
      return res.status(400).json({ error: "Missing face images or analysis result" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompts = buildPrompts(analysisResult);

    // Prepare reference face images
    const refImages = [];
    for (const img of faceImages.slice(0, 3)) {
      try {
        const jpg = await toJpeg(img.base64);
        refImages.push({ inlineData: { mimeType: "image/jpeg", data: jpg } });
      } catch (e) {
        console.error("Face image convert failed:", e.message);
      }
    }

    if (refImages.length === 0) {
      return res.status(400).json({ error: "No valid face images" });
    }

    console.log(`Generating ${prompts.length} lookbook images with ${refImages.length} reference faces...`);

    // Generate images in batches of 4 (to avoid rate limits)
    const results = [];
    const batchSize = 4;

    for (let i = 0; i < prompts.length; i += batchSize) {
      const batch = prompts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async ({ season, prompt }) => {
          try {
            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash-image",
              contents: [
                {
                  role: "user",
                  parts: [
                    ...refImages,
                    { text: prompt },
                  ],
                },
              ],
              config: {
                responseModalities: ["TEXT", "IMAGE"],
              },
            });

            // Extract image from response
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                return {
                  season,
                  image: part.inlineData.data,
                  mimeType: part.inlineData.mimeType,
                };
              }
            }
            console.error(`No image in response for ${season}`);
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
    console.log(`Generated ${looks.length}/${prompts.length} images successfully`);

    // Group by season
    const grouped = {};
    for (const look of looks) {
      if (!grouped[look.season]) grouped[look.season] = [];
      grouped[look.season].push({
        image: `data:${look.mimeType};base64,${look.image}`,
      });
    }

    res.json({ looks: grouped });
  } catch (err) {
    console.error("Generation error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
