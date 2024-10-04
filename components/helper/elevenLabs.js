// lib/elevenLabs.ts
import { ElevenLabsClient } from "elevenlabs";

const NEXT_PUBLIC_ELEVENLABS_API_KEY =
  process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

if (!NEXT_PUBLIC_ELEVENLABS_API_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_ELEVENLABS_API_KEY in environment variables",
  );
}

const client = new ElevenLabsClient({
  apiKey: NEXT_PUBLIC_ELEVENLABS_API_KEY,
});

export const createAudioStreamFromText = async (text) => {
  const audioStream = await client.generate({
    voice: "Grace",
    model_id: "eleven_turbo_v2",
    text,
  });

  const chunks = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  const content = Buffer.concat(chunks);
  return content;
};
