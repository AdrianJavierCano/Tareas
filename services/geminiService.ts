import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const motivationalPrompts = [
    "Genera una frase motivacional corta y poderosa sobre cómo superar la procrastinación.",
    "Dame un consejo de una frase para mantenerme concentrado.",
    "¿Cuál es un mensaje corto e inspirador para alguien que intenta ser productivo?",
    "Genera una frase concisa sobre el poder de dar el primer paso.",
    "Una frase corta sobre la constancia y el éxito.",
    "Una frase inspiradora para vencer la pereza ahora mismo."
];

export async function generateMotivationalQuote(): Promise<string> {
  try {
    const randomPrompt = motivationalPrompts[Math.floor(Math.random() * motivationalPrompts.length)];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: randomPrompt,
      config: {
        temperature: 0.9,
        maxOutputTokens: 50,
      }
    });

    const text = response.text.trim().replace(/^"|"$/g, ''); // Clean up quotes
    
    if (!text) {
        return "Un viaje de mil millas comienza con un solo paso.";
    }

    return text;
  } catch (error) {
    console.error("Error generating motivational quote:", error);
    // Provide a fallback quote in case of an API error
    return "El secreto para salir adelante es empezar.";
  }
}