import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_KEY = process.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-3-pro-image-preview";
const OUTPUT_DIR = path.join(__dirname, '../public/images/generated');

// Duplicate constants here to avoid TS compilation issues in this simple script
const STATIC_PROMPTS = {
    WORLD_MAP_TEXTURE: {
        id: 'world-map-texture',
        prompt: "Vintage artistic world map illustration, golden lines on dark brown background, focusing on the equator, elegant, minimalist, high detail",
        filename: 'world-map-texture.png'
    },
    TRACEABILITY_ILLUSTRATION: {
        id: 'traceability-illustration',
        prompt: "Minimalist continuous line art illustration connecting a cacao pod to a digital blockchain cube, tech agriculture concept, elegant ink drawing",
        filename: 'traceability-illustration.png'
    },
    GLOBAL_SOURCING_MAP: {
        id: 'global-sourcing-map',
        prompt: "Artistic stylized world map illustration on textured paper, highlighting Ecuador, Madagascar, and Venezuela with golden pins, vintage explorer style, high detail",
        filename: 'global-sourcing-map.png'
    },
    MANABI_BAR: {
        id: 'manabi-bar',
        prompt: "Studio photography of a single luxury dark chocolate bar, Manabí 70%, minimal elegant vibe, soft lighting, 4k resolution, top down view, premium packaging feel",
        filename: 'manabi-bar.png'
    },
    SAMBIRANO_CHUNKS: {
        id: 'sambirano-chunks',
        prompt: "Macro photography of broken chunks of premium dark chocolate, 85% cacao, reddish tint, rich texture, scattered on a white marble surface, high detail",
        filename: 'sambirano-chunks.png'
    },
    DARK_MILK_STACK: {
        id: 'dark-milk-stack',
        prompt: "A neat artistic stack of creamy dark milk chocolate squares, 55% cacao, warm caramel lighting, appetizing, smooth texture, shallow depth of field",
        filename: 'dark-milk-stack.png'
    }
};

async function generateAndSaveImage(promptConfig) {
    const filePath = path.join(OUTPUT_DIR, promptConfig.filename);

    if (fs.existsSync(filePath)) {
        console.log(`Skipping ${promptConfig.id}: already exists.`);
        return;
    }

    console.log(`Generating ${promptConfig.id}...`);

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: {
                parts: [{ text: promptConfig.prompt }]
            }
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    const buffer = Buffer.from(part.inlineData.data, 'base64');
                    fs.writeFileSync(filePath, buffer);
                    console.log(`Saved ${promptConfig.filename}`);
                    return;
                }
            }
        }
        console.error(`No image data found for ${promptConfig.id}`);

    } catch (error) {
        console.error(`Error generating ${promptConfig.id}:`, error.message);
    }
}

async function main() {
    if (!API_KEY) {
        console.error("Error: VITE_GEMINI_API_KEY is not set in .env file.");
        process.exit(1);
    }

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const key in STATIC_PROMPTS) {
        await generateAndSaveImage(STATIC_PROMPTS[key]);
    }
}

main();
