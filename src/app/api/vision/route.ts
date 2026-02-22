import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // base64 image

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Chiave API mancante." }, { status: 500 });
    }

    if (!image) {
      return NextResponse.json({ error: "Immagine mancante." }, { status: 400 });
    }

    // Extract base64 data
    const base64Data = image.split(",")[1];
    const { missionId } = await req.json().catch(() => ({}));

    let prompt = `
      Sei l'Apprendista del Branco. Il tuo Maestro (un bambino) ti ha mostrato questa immagine attraverso la sua fotocamera.
      Analizza l'immagine e descrivi cosa vedi con entusiasmo e curiosità.
      Se vedi un oggetto specifico, spiega brevemente cos'è come se lo stessi imparando ora.
      Usa un linguaggio semplice, giocoso e molte emoji (🐺, 👀, ✨).
      Rispondi in italiano.
    `;

    if (missionId === 'm_001') {
      prompt += `
        NOTA SPECIALE: Il bambino sta cercando di completare la missione "Esplorazione Verde". 
        Deve mostrarti tre foglie di forma diversa. 
        Se vedi delle foglie, controlla quante sono e se hanno forme diverse. 
        Se la missione è compiuta, esclama con gioia che hai imparato tutto sulle foglie e che il bambino ha vinto la "Medaglia del Botanico"!
        Se non è ancora finita, incoraggialo a cercarne altre.
      `;
    }

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Vision API Error:", error);
    return NextResponse.json({ error: "Errore durante l'analisi dell'immagine." }, { status: 500 });
  }
}
