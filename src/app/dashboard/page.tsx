"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getKnowledge, saveKnowledge, KnowledgeItem } from "@/lib/store";
import { Mission, getMissions, pb } from "@/lib/pocketbase";

export default function Dashboard() {
  const [mode, setMode] = useState<"chat" | "vision">("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Vision state
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Load data on mount
  useEffect(() => {
    setKnowledge(getKnowledge());
    
    // Initial missions load
    const loadMissions = async () => {
      const data = await getMissions();
      setMissions(data);
    };
    loadMissions();

    // Subscribe to mission changes
    pb.collection('missioni').subscribe('*', function (e) {
        loadMissions();
    });

    return () => {
        pb.collection('missioni').unsubscribe();
    };
  }, []);

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
        
        // Logical inference: if the robot says "Ho imparato che..." or similar, save it
        if (data.text.toLowerCase().includes("imparato") || data.text.toLowerCase().includes("salvato")) {
           const newItem = saveKnowledge({ type: "fact", content: userMessage });
           if (newItem) setKnowledge(prev => [newItem, ...prev]);
        }
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "model", text: "Ops, Maestro! " + data.error }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", text: "Maestro, il mio cervello sembra un po' confuso. Riprovi?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setMode("vision");
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Maestro, non riesco ad attivare la fotocamera! Controlla i permessi.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
      setMode("chat");
    }
  };

  const takeSnapshot = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const imageData = canvasRef.current.toDataURL("image/jpeg");
    setIsThinking(true);
    setMode("chat"); 

    try {
      const response = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "model", text: data.text }]);
        // Save what was seen
        const newItem = saveKnowledge({ type: "vision", content: `Ho visto: ${data.text.substring(0, 50)}...` });
        if (newItem) setKnowledge(prev => [newItem, ...prev]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", text: "Maestro, non sono riuscito a capire bene cosa mi hai mostrato." }]);
    } finally {
      setIsThinking(false);
      stopCamera();
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
          {/* Active Missions */}
          {missions.length > 0 && (
            <div className="mb-6 space-y-3">
              <div className="px-2 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">Missioni Attive</span>
                <span className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse"></span>
              </div>
              <AnimatePresence>
                {missions.filter(m => !m.completata).map((mission) => (
                  <motion.div 
                    key={mission.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-primary/10 border border-primary/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <span className="material-icons-round text-primary text-sm">
                          {mission.tipo === 'reale' ? 'explore' : mission.tipo === 'logica' ? 'psychology' : 'auto_stories'}
                       </span>
                       <h3 className="text-xs font-black uppercase tracking-tight text-primary">{mission.titolo}</h3>
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                      {mission.descrizione}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Dynamic Knowledge List */}
          <AnimatePresence>
            {knowledge.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-icons-round text-[10px] text-primary">
                    {item.type === 'vision' ? 'visibility' : 'auto_awesome'}
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    {item.type === 'vision' ? 'Memoria Visiva' : 'Fatto Imparato'}
                  </span>
                </div>
                <p className="text-[11px] font-medium leading-tight line-clamp-2">{item.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {knowledge.length === 0 && (
            <div className="py-8 text-center px-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
                Ancora nessuna conoscenza.<br/>Insegna qualcosa al branco!
              </p>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <div 
            onClick={() => mode === "vision" ? stopCamera() : startCamera()}
            className={`p-4 rounded-2xl transition-all cursor-pointer border mb-4 ${mode === 'vision' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-700'}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-icons-round">visibility</span>
              <span className="font-bold text-xs uppercase tracking-tighter">Attiva Visione</span>
            </div>
          </div>

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
             <span className="text-sm font-bold uppercase tracking-widest text-slate-500">{mode === 'vision' ? 'Visione' : 'Dashboard'}</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center cursor-pointer">
            <span className="material-icons-round text-sm">settings</span>
          </button>
        </header>

        {/* Interaction Area */}
        <div className="flex-1 relative flex flex-col overflow-hidden px-4 md:px-8 pb-32">
          
          {mode === "chat" ? (
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
              {messages.length === 0 && !isThinking && (
                <div className="flex flex-col items-center justify-center h-full opacity-40">
                   <div className="relative w-full max-w-[250px] aspect-square flex items-center justify-center">
                      <img alt="Robot Wolf" className="w-full h-full object-contain grayscale" src="/robot-wolf.png" />
                   </div>
                   <h3 className="text-lg font-bold mt-4">Cosa mi insegni oggi?</h3>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center z-10">
              <div className="relative w-full max-w-lg aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-primary">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-white/20 pointer-events-none"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full">LIVE FEED</div>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={takeSnapshot}
                  className="bg-primary hover:bg-primary/90 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-primary/30 transition-transform active:scale-90 cursor-pointer"
                >
                  <span className="material-icons-round text-3xl">camera</span>
                </button>
                <button 
                  onClick={stopCamera}
                  className="bg-white dark:bg-slate-800 text-slate-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-90 cursor-pointer"
                >
                  <span className="material-icons-round text-3xl">close</span>
                </button>
              </div>
              <p className="mt-6 font-bold text-slate-500 uppercase tracking-widest text-xs">Punta la fotocamera e scatta!</p>
            </div>
          )}
        </div>

        {/* Bottom Bar: Intent Input (Only in chat mode) */}
        {mode === "chat" && (
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
        )}
      </section>
    </main>
  );
}
