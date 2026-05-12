import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface VideoSegment {
  title: string;
  duration: string;
  voiceover: string;
  visualPrompt: string;
}

export interface VideoScript {
  topic: string;
  totalDuration: string;
  language: string;
  segments: VideoSegment[];
}

export async function generateVideoScript(topic: string, duration: string, language: string): Promise<VideoScript> {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Génère un script de vidéo professionnel pour le sujet suivant : "${topic}". 
    La durée totale souhaitée est de ${duration}. 
    La langue doit être : ${language}.
    
    Structure le script en segments logiques (introduction, points clés, conclusion).
    Pour chaque segment, fournis :
    1. Un titre accrocheur.
    2. Une durée estimée.
    3. Le texte de la voix-off (ton expert, engageant).
    4. Un prompt visuel détaillé pour un générateur de vidéo IA (type Sora/Runway) décrivant la scène, l'éclairage, et le mouvement.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          totalDuration: { type: Type.STRING },
          language: { type: Type.STRING },
          segments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                duration: { type: Type.STRING },
                voiceover: { type: Type.STRING },
                visualPrompt: { type: Type.STRING },
              },
              required: ["title", "duration", "voiceover", "visualPrompt"],
            },
          },
        },
        required: ["topic", "totalDuration", "language", "segments"],
      },
    },
  });

  if (!response.text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(response.text) as VideoScript;
}
