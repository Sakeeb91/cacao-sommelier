import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("Error: VITE_GEMINI_API_KEY is not set in .env file");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const IMAGE_MODEL = "gemini-3-pro-image-preview";

// Prompts from src/constants/prompts.ts
const STATIC_PROMPTS = {
    // BentoGrid Prompts
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

    // Shop Prompts
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
    },

    // Process Prompts
    PROCESS_HARVEST_THUMB: {
        id: 'process-harvest-thumb',
        prompt: "Close up of hands gently cutting a yellow cacao pod from a tree trunk, rainforest background, soft dappled light, photorealistic, cinematic 4k",
        filename: 'process-harvest-thumb.png'
    },
    PROCESS_HARVEST_DETAIL: {
        id: 'process-harvest-detail',
        prompt: "Wide shot of cacao farmers gathering colorful pods in a lush tropical forest, sunbeams filtering through leaves, documentary style",
        filename: 'process-harvest-detail.png'
    },
    PROCESS_FERMENT_THUMB: {
        id: 'process-ferment-thumb',
        prompt: "Wooden fermentation boxes filled with cacao beans covered in banana leaves, steam rising, warm lighting, rustic texture, macro photography",
        filename: 'process-ferment-thumb.png'
    },
    PROCESS_FERMENT_DETAIL: {
        id: 'process-ferment-detail',
        prompt: "Close up texture shot of wet cacao beans fermenting, steam, rich organic textures, banana leaf covering, warm earth tones",
        filename: 'process-ferment-detail.png'
    },
    PROCESS_ROAST_THUMB: {
        id: 'process-roast-thumb',
        prompt: "Antique coffee roaster machine roasting cacao beans, motion blur of spinning drum, dark moody industrial lighting, copper and steel",
        filename: 'process-roast-thumb.png'
    },
    PROCESS_ROAST_DETAIL: {
        id: 'process-roast-detail',
        prompt: "Interior view of a cacao roaster, beans tumbling in mid-air, heat waves, cinematic lighting, glowing heating elements",
        filename: 'process-roast-detail.png'
    },
    PROCESS_CONCH_THUMB: {
        id: 'process-conch-thumb',
        prompt: "Liquid chocolate flowing in a stone conching machine, silky smooth texture, ripples, macro photography, cinematic lighting, delicious",
        filename: 'process-conch-thumb.png'
    },
    PROCESS_CONCH_DETAIL: {
        id: 'process-conch-detail',
        prompt: "Macro abstract shot of swirling liquid dark chocolate, silky texture, light reflections, high contrast, mouth-watering",
        filename: 'process-conch-detail.png'
    },

    // Origins Prompts
    ORIGIN_MANABI_MAIN: {
        id: 'origin-manabi-main',
        prompt: "Cinematic landscape of a traditional cacao farm in Manabí Ecuador, misty mountains in the background, drying cacao beans on wooden tables, lush tropical greenery, soft morning light, photorealistic 8k",
        filename: 'origin-manabi-main.png'
    },
    ORIGIN_MANABI_PEOPLE: {
        id: 'origin-manabi-people',
        prompt: "Portrait of an elderly Ecuadorian cacao farmer smiling in a lush green cacao grove, wearing a straw hat, soft natural lighting, photorealistic, dignified",
        filename: 'origin-manabi-people.png'
    },
    ORIGIN_MANABI_CACAO: {
        id: 'origin-manabi-cacao',
        prompt: "Close up macro shot of a halved raw cacao bean showing intricate purple interior texture, rustic wooden background, natural light",
        filename: 'origin-manabi-cacao.png'
    },
    ORIGIN_SAMBIRANO_MAIN: {
        id: 'origin-sambirano-main',
        prompt: "Macro close-up of vibrant red and orange cacao pods hanging on a tree trunk in Sambirano Valley Madagascar, sunlight filtering through leaves, rich soil texture visible, high contrast, tropical vibe",
        filename: 'origin-sambirano-main.png'
    },
    ORIGIN_SAMBIRANO_PEOPLE: {
        id: 'origin-sambirano-people',
        prompt: "Documentary style shot of workers in Madagascar turning cacao beans in wooden fermentation boxes, golden hour sunlight, dynamic motion blur, rich colors",
        filename: 'origin-sambirano-people.png'
    },
    ORIGIN_SAMBIRANO_CACAO: {
        id: 'origin-sambirano-cacao',
        prompt: "Artistic shot of roasted cacao nibs and fresh raspberries on a dark slate surface, dramatic lighting, high contrast",
        filename: 'origin-sambirano-cacao.png'
    },
    ORIGIN_CHUAO_MAIN: {
        id: 'origin-chuao-main',
        prompt: "Wide shot of the village of Chuao Venezuela, cacao beans drying in the central square in front of a colonial church, mountains in the background, rustic, warm earth tones, documentary style photography",
        filename: 'origin-chuao-main.png'
    },
    ORIGIN_CHUAO_PEOPLE: {
        id: 'origin-chuao-people',
        prompt: "Portrait of a Venezuelan woman drying cacao beans in a village square, colonial church in background, colorful clothing, warm sunlight, cultural photography",
        filename: 'origin-chuao-people.png'
    },
    ORIGIN_CHUAO_CACAO: {
        id: 'origin-chuao-cacao',
        prompt: "Cinematic shot of dark liquid chocolate being poured, rich texture, steam rising, dark moody lighting, luxury food photography",
        filename: 'origin-chuao-cacao.png'
    }
};

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'generated');

async function generateAndSaveImage(promptObj: any) {
    const filePath = path.join(OUTPUT_DIR, promptObj.filename);

    if (fs.existsSync(filePath)) {
        console.log(`Skipping ${promptObj.filename} (already exists)`);
        return;
    }

    console.log(`Generating ${promptObj.filename}...`);
    try {
        const response = await ai.models.generateContent({
            model: IMAGE_MODEL,
            contents: {
                parts: [{ text: promptObj.prompt }]
            }
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    const buffer = Buffer.from(part.inlineData.data, 'base64');
                    fs.writeFileSync(filePath, buffer);
                    console.log(`Saved ${promptObj.filename}`);
                    return;
                }
            }
        }
        console.error(`Failed to generate image for ${promptObj.id}: No image data found`);

    } catch (error) {
        console.error(`Error generating ${promptObj.filename}:`, error);
    }
}

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const key in STATIC_PROMPTS) {
        await generateAndSaveImage((STATIC_PROMPTS as any)[key]);
        // Add a delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

main();
