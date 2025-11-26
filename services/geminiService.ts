import { GoogleGenAI, Modality } from "@google/genai";
import { PairingResponse, GroundingSource } from "../types";

// Initialize the SDK only if API key is available
// Use a placeholder key to prevent constructor errors, then check validity in functions
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'placeholder';
let ai: GoogleGenAI | null = null;

try {
  ai = new GoogleGenAI({ apiKey: apiKey === 'placeholder' ? '' : apiKey });
} catch (error) {
  console.warn('Gemini API not initialized. Some features will be unavailable.');
  ai = null;
}

// Constants for Models
const TEXT_MODEL = "gemini-2.5-flash";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";
const IMAGE_MODEL = "gemini-2.5-flash-image";

// In-memory cache to store generated images (Base64 strings)
const imageCache = new Map<string, string>();

// Track in-flight requests to deduplicate concurrent calls (e.g. React Strict Mode)
const activeRequests = new Map<string, Promise<string>>();

/**
 * Generates a chocolate pairing suggestion based on user input using Search Grounding.
 */
export const getPairingSuggestion = async (query: string): Promise<PairingResponse> => {
  if (!ai) {
    throw new Error("Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your environment.");
  }
  try {
    const systemInstruction = "You are a world-class chocolate sommelier. Provide a sophisticated and concise pairing suggestion (maximum 80 words) for the user's query. Explain why the chocolate profile (dark, nutty, floral, etc.) complements the query item. Use an elegant and descriptive tone.";
    const fullQuery = `Suggest a premium dark chocolate pairing for: "${query}"`;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: fullQuery,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response on this simple task
      },
    });

    const text = response.text || "I apologize, I could not generate a pairing at this moment.";

    // Extract grounding chunks if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title)
      .map((web: any) => ({
        title: web.title,
        uri: web.uri
      }));

    return {
      suggestion: text,
      sources: sources
    };

  } catch (error) {
    console.error("Gemini Pairing Error:", error);
    throw new Error("Failed to consult the sommelier.");
  }
};

/**
 * Generates speech from text using the Gemini TTS model.
 * Returns an AudioBuffer for playback.
 */
export const generateTastingAudio = async (text: string, audioContext: AudioContext): Promise<AudioBuffer> => {
  if (!ai) {
    throw new Error("Gemini API key not configured. Audio generation unavailable.");
  }
  try {
    const prompt = `Say in a smooth, informative, and luxurious tone: "${text}"`;

    const response = await ai.models.generateContent({
      model: TTS_MODEL,
      contents: { parts: [{ text: prompt }] },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Deep, rich voice suitable for luxury
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No audio data received.");
    }

    // Decode Base64 to ArrayBuffer
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    try {
      return await audioContext.decodeAudioData(bytes.buffer);
    } catch (e) {
      return await decodePCM(bytes, audioContext);
    }

  } catch (error) {
    console.error("Gemini TTS Error:", error);
    throw new Error("Unable to generate audio guide.");
  }
};

// Helper to decode raw PCM if necessary
async function decodePCM(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Generates an image using Gemini Flash Image model.
 * Returns a Base64 data URL.
 * Implements Caching (Memory + Request Deduplication) to prevent re-generation.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  // 1. Check Memory Cache
  if (imageCache.has(prompt)) {
    return imageCache.get(prompt)!;
  }

  // 2. Check In-Flight Requests (Deduplication)
  if (activeRequests.has(prompt)) {
    return activeRequests.get(prompt)!;
  }

  // 3. Create New Request
  const requestPromise = (async () => {
    if (!ai) {
      throw new Error("Gemini API key not configured. Image generation unavailable.");
    }
    try {
      const response = await ai.models.generateContent({
        model: IMAGE_MODEL,
        contents: {
          parts: [{ text: prompt }]
        }
      });

      // Iterate parts to find the image
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;

            // Save to Cache
            imageCache.set(prompt, imageUrl);

            return imageUrl;
          }
        }
      }

      throw new Error("No image data found in response");
    } catch (error) {
      console.error("Gemini Image Gen Error:", error);
      throw error;
    } finally {
      // Cleanup promise from active requests
      activeRequests.delete(prompt);
    }
  })();

  activeRequests.set(prompt, requestPromise);
  return requestPromise;
};