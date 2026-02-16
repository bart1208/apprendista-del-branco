import Image from "next/image";

export default function Dashboard() {
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
          {/* Example Knowledge Modules */}
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
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>

        {/* Top Header */}
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

        {/* Robot Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-8 pb-32">
          <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
            {/* Thinking Bubbles / Connections (Conceptual) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute top-0 left-1/4 w-4 h-4 bg-accent-yellow rounded-full shadow-lg shadow-accent-yellow/50"></div>
              <div className="absolute bottom-1/4 right-0 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
            </div>

            {/* The Robot Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Wolf Robot Dashboard" 
              className="w-full h-full object-contain relative z-10 scale-110 drop-shadow-2xl" 
              src="/robot-wolf.png" 
            />
            
            {/* Base Shadow */}
            <div className="absolute bottom-4 w-1/2 h-4 bg-black/10 dark:bg-white/5 rounded-[100%] blur-xl"></div>
          </div>
          
          <div className="text-center mt-8 relative z-10">
            <h3 className="text-xl font-bold mb-2">Sono pronto, Maestro.</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm">Cosa vogliamo insegnare al branco oggi?</p>
          </div>
        </div>

        {/* Bottom Bar: Intent Input */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Impartisci un ordine o poni una domanda..." 
                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl py-6 px-8 pr-20 shadow-2xl focus:outline-none focus:border-primary transition-all text-lg font-medium"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                <span className="material-icons-round text-2xl">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
