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

function buildPrompts(analysisResult, lang) {
  const kr = lang === "kr";
  const { personalColor, bodyType, styleRecommendation } = analysisResult;
  const season = personalColor?.season || "";
  const bodyDesc = bodyType?.type || "";
  const bestColors = personalColor?.bestColors?.join(", ") || "";

  const baseContext = `This person's personal color is ${season}, body type is ${bodyDesc}. Their best colors are: ${bestColors}.`;

  const seasons = kr
    ? [
        { name: "봄", scenes: ["벚꽃이 핀 공원에서 산책하는", "카페 테라스에서 브런치를 즐기는", "꽃시장을 구경하는"] },
        { name: "여름", scenes: ["해변 근처 리조트에서", "여름 저녁 루프탑에서", "하얀 건물이 있는 지중해풍 거리에서"] },
        { name: "가을", scenes: ["단풍이 든 파리 거리에서", "가을 공원 벤치 옆에서", "갤러리 오프닝에서"] },
        { name: "겨울", scenes: ["눈 내리는 도시 거리에서", "고급 레스토랑에서 디너", "겨울 밤 일루미네이션 앞에서"] },
      ]
    : [
        { name: "Spring", scenes: ["walking in a cherry blossom park", "at a cafe terrace having brunch", "browsing a flower market"] },
        { name: "Summer", scenes: ["at a beachside resort", "on a rooftop bar in summer evening", "on a Mediterranean-style white street"] },
        { name: "Fall", scenes: ["on a Paris street with autumn leaves", "near a park bench in fall", "at a gallery opening"] },
        { name: "Winter", scenes: ["on a snowy city street", "at an upscale restaurant for dinner", "in front of winter illuminations"] },
      ];

  const prompts = [];
  for (const s of seasons) {
    for (const scene of s.scenes) {
      const prompt = kr
        ? `이 사람의 얼굴과 체형을 유지하면서, ${s.name} 시즌에 어울리는 ${season} 컬러 팔레트의 세련된 코디를 입고 ${scene} 모습을 전신 패션 룩북 사진으로 생성해주세요. 자연스러운 포즈, 패션 매거진 스타일, 전신이 보이는 사진. ${baseContext}`
        : `Generate a full-body fashion lookbook photo of this person maintaining their face and body, wearing a stylish ${season} color palette outfit for ${s.name}, ${scene}. Natural pose, fashion magazine style, full body visible. ${baseContext}`;
      prompts.push({ season: s.name, prompt });
    }
  }
  return prompts;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { faceImages, analysisResult, lang } = req.body;
    if (!faceImages?.length || !analysisResult) {
      return res.status(400).json({ error: "Missing face images or analysis result" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompts = buildPrompts(analysisResult, lang || "kr");

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
              model: "gemini-2.0-flash-exp",
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
