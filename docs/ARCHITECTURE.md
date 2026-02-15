# Architettura Tecnica - L'Apprendista del Branco

Questo documento descrive la struttura tecnica del progetto, i componenti e il flusso di dati.

## 1. Stack Tecnologico Proposto

| Componente | Tecnologia | Motivazione |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React) | Ottimo per PWA, routing integrato e SEO (se serve). |
| **Styling** | Tailwind CSS | Sviluppo rapido di un'interfaccia "kid-friendly" e responsiva. |
| **Backend** | Next.js API Routes / Serverless | Semplicità di deployment e orchestrazione AI. |
| **AI (Multimodale)** | Google Gemini 1.5 Flash | Veloce, economico e supporta nativamente input audio/video/immagine. |
| **Database/Auth** | Supabase | Postgres pronto all'uso, gestione utenti e storage per le foto delle missioni. |
| **Voice (TTS)** | ElevenLabs / OpenAI TTS | Per dare all'Apprendista una voce calda e non robotica. |

## 2. Componenti del Sistema

### 2.1 "The Brain" (AI Orchestrator)
Il backend non si limita a passare messaggi. Deve:
1.  **Gestire il Context:** Ricordare le lezioni precedenti impartite dal bambino.
2.  **Validare la Logica:** Verificare se la risposta/azione del bambino è corretta rispetto alla sfida.
3.  **Prompt Engineering:** Tradurre le intenzioni del sistema in un linguaggio adatto a un bambino (tono curioso, umile, entusiasta).

### 2.2 Modulo "Phygital" (Vision)
Utilizza la fotocamera del tablet. L'immagine viene inviata a Gemini 1.5 per identificare gli oggetti e confermare il completamento della missione (es. "Ho trovato la foglia verde!").

### 2.3 Sistema "Energy & Sleep"
Un contatore lato server che monitora il tempo di attività. Quando l'energia scende (dopo 30-45 min), l'UI cambia gradualmente (colori più caldi, animazioni più lente) finché l'Apprendista non dice di dover dormire.

## 3. Flusso Dati (Esempio Missione)
1.  **Apprendista:** "Non capisco cos'è un cerchio. Puoi cercarne uno in casa?" (TTS)
2.  **Bambino:** Mostra un piatto alla fotocamera.
3.  **Frontend:** Cattura frame -> API -> Gemini (Vision).
4.  **AI:** Analizza: "L'utente ha mostrato un piatto tondo".
5.  **Apprendista:** "Oh! Quindi un cerchio è tondo come questo piatto? Grazie Maestro!" (TTS + Animazione).

## 4. Sicurezza e Privacy
- **Privacy by Design:** Le foto delle missioni non devono essere usate per il training dell'IA esterna.
- **Local Storage:** Preferire l'elaborazione locale o l'eliminazione immediata dei media sensibili dopo l'analisi.
