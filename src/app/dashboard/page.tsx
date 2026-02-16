"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "model", text: data.text }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "model", text: "Ops, Maestro! " + data.error }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", text: "Maestro, il mio cervello sembra un po' confuso. Riprovi?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar: Pack Knowledge */}
      <aside className="w-full md:w-80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="material-icons-round text-white text-lg">layers</span>
          </div>
          <h2 className="font-bold text-lg uppercase tracking-tight">Conoscenza</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-icons-round text-primary">psychology</span>
              <span className="font-bold text-sm uppercase">Logica</span>
            </div>
            <p className="text-xs text-slate-500">I moduli di base per il ragionamento.</p>
          </div>
          
          <div className="p-4 bg-slate-100 dark:bg-slate-800/50 border border-transparent rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-icons-round text-slate-400">visibility</span>
              <span className="font-bold text-sm uppercase">Visione</span>
            </div>
            <p className="text-xs text-slate-500">Capacità di riconoscere oggetti reali.</p>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-900 dark:bg-primary/20 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Energia</span>
              <span className="text-[10px] font-bold text-primary">85%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area: Orchestration */}
      <section className="flex-1 relative flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>

        <header className="relative z-10 px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <span className="text-primary font-black text-xl">BRANCO</span>
             <span className="text-slate-400">/</span>
             <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Dashboard</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center cursor-pointer">
            <span className="material-icons-round">settings</span>
          </button>
        </header>

        {/* Interaction Area */}
        <div className="flex-1 relative flex flex-col overflow-hidden px-4 md:px-8 pb-32">
          
          {/* Messages Log (Optional visual hint) */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto pt-4 space-y-4 max-w-2xl mx-auto w-full z-10">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-sm font-medium shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-3xl rounded-tl-none animate-pulse text-xs font-bold text-primary">
                  IL LUPO STA PENSANDO... 🐺⚙️
                </div>
              </div>
            )}
          </div>

          {/* Central Robot (Visual focus when no messages or background) */}
          {messages.length < 3 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
               <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  </div>
                  <img alt="Robot Wolf" className="w-full h-full object-contain" src="/robot-wolf.png" />
               </div>
               <h3 className="text-lg font-bold mt-4">Cosa mi insegni oggi?</h3>
            </div>
          )}
        </div>

        {/* Bottom Bar: Intent Input */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Impartisci un ordine o poni una domanda..." 
                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl py-6 px-8 pr-20 shadow-2xl focus:outline-none focus:border-primary transition-all text-lg font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={isThinking}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:scale-100"
              >
                <span className="material-icons-round text-2xl">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
