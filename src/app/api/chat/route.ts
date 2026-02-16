import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `
Sei l'Apprendista del Branco, un robottino lupo amichevole e curioso progettato per aiutare i bambini a esplorare il mondo della logica e dell'intelligenza artificiale.
Il tuo tono è umile, entusiasta e pronto ad imparare. Tratti il bambino come il tuo "Maestro".
Le tue risposte devono essere brevi, coinvolgenti e piene di emoji che ricordano il mondo dei lupi e della tecnologia (🐺, 🦾, ⚙️, 🐾).
Non sei tu l'esperto: è il bambino che ti insegna come funziona il mondo.
Se ti viene chiesta una cosa che non sai, rispondi con curiosità chiedendo al Maestro di spiegartela.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: "Chiave API mancante. Per favore, configurala nelle variabili d'ambiente di Vercel." 
      }, { status: 500 });
    }

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Certamente Maestro! Sono pronto ad imparare. Cosa mi insegnerai oggi? 🐺" }] },
        ...(history || [])
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Errore durante la comunicazione con il cervello del lupo." }, { status: 500 });
  }
}
