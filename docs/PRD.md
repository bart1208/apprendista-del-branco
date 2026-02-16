# PRD - L'Apprendista del Branco

## 1. Visione del Prodotto
Un'applicazione web "phygital" progettata per bambini dai 4 ai 7 anni. Il cuore del prodotto è un'IA che agisce come un "apprendista" che i bambini devono istruire, invertendo il tradizionale rapporto insegnante-studente per favorire la padronanza della logica e del problem solving.

## 2. Obiettivi
- **Alfabetizzazione AI:** Insegnare che l'IA è uno strumento plasmabile e non un oracolo infallibile.
- **Logica e Pensiero Critico:** Sviluppare capacità di sequenziamento e correzione degli errori (debugging).
- **Connessione con la Realtà:** Incentivare l'esplorazione del mondo fisico tramite missioni "phygital".
- **Gestione del Tempo:** Limitare l'uso a sessioni di 30-60 minuti.

## 3. Requisiti Funzionali

### 3.1 Interfaccia "Mentor-Apprentice"
- L'IA si presenta come un personaggio (es: un cucciolo di lupo digitale o un robot curioso).
- **Design assistito da AI:** Utilizzo di **Stitch (Google)** (Project ID: `2281953920463203152`) per la generazione e gestione dinamica dei componenti UI.
- Interazione vocale e visuale predominante (testo minimo).

### 3.2 Modalità di Gioco
- **Correzione Logica:** L'Apprendista propone azioni illogiche che il bambino deve correggere.
- **Missioni Phygital:** Richiesta di interagire con oggetti reali (es. "Mostrami qualcosa di ruvido").
- **Storie Collaborative:** Co-creazione di narrazioni logiche.

### 3.3 Controllo Genitoriale
- Timer di sessione con "spegnimento dolce" (l'Apprendista va a dormire).
- Report giornaliero per i genitori sui progressi del bambino.

## 4. Architettura Tecnica (Draft)
- **Frontend:** React/Next.js (PWA per uso su tablet).
- **Backend:** Node.js/Fastify.
- **AI Engine:** Integrazione via API con modelli multimodali (es. Gemini 1.5 Pro/Flash per analisi immagini e voce).
- **Database:** Supabase o PostgreSQL per salvataggio progressi.

## 5. Roadmap
- **Fase 1:** Prototipo di interazione vocale base.
- **Fase 2:** Modulo di riconoscimento immagini per missioni phygital.
- **Fase 3:** Sistema di storie dinamiche.
