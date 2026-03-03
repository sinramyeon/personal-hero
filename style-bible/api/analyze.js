export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { default: Anthropic } = await import("@anthropic-ai/sdk");

  try {
    const { images } = req.body;
    if (!images?.face || !images?.body || !images?.outfit) {
      return res.status(400).json({ error: "Missing image categories" });
    }

    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
    const content = [];

    const addImages = (label, imgs) => {
      content.push({ type: "text", text: label });
      for (const img of imgs) {
        content.push({ type: "image", source: { type: "base64", media_type: img.mediaType || "image/jpeg", data: img.base64 } });
      }
    };

    addImages("=== FACE PHOTOS ===", images.face);
    addImages("=== FULL BODY PHOTOS ===", images.body);
    addImages("=== FAVORITE OUTFIT PHOTOS ===", images.outfit);
    content.push({ type: "text", text: "Analyze all photos and return JSON." });

    const SYSTEM_PROMPT = `You are an expert personal color and body type analyst. Analyze the provided photos and return a JSON object with this exact structure (respond ONLY with valid JSON, no markdown):
{"personalColor":{"season":"string","subtype":"string","description":"string","bestColors":["hex"],"worstColors":["hex"]},"bodyType":{"type":"string","description":"string","strengths":["string"],"tips":["string"]},"styleRecommendation":{"summary":"string","doList":["string"],"dontList":["string"]}}
Be specific with hex codes and practical with style advice.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const text = response.content[0].text;
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
}