import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 min-h-screen relative overflow-hidden flex flex-col">
      {/* Subtle Tech Background - Full Screen */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-8 md:py-12">
        
        {/* Header Section */}
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-icons-round text-white text-2xl">smart_toy</span>
            </div>
            <span className="text-primary font-extrabold text-xl tracking-tight uppercase">Branco</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            L&apos;Apprendista <br />
            <span className="text-primary">del Branco</span>
          </h1>
        </header>

        {/* Character Illustration Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
          
          {/* Robot Wolf Container */}
          <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-square flex items-center justify-center robot-glow">
            
            {/* The Robot Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Friendly minimalist white robot wolf" 
              className="w-full h-full object-contain relative z-10 transition-transform duration-700 hover:scale-105" 
              src="/robot-wolf.png" 
            />
            
            {/* Shadow beneath */}
            <div className="absolute bottom-4 w-3/4 h-4 bg-black/5 dark:bg-white/5 rounded-[100%] blur-lg"></div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mt-10 md:mt-12 w-full">
            <div className="inline-flex items-center gap-2 bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/20 px-4 py-1.5 rounded-full mb-6">
              <span className="material-icons-round text-base">stars</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Level 1: Nuovo Membro</span>
            </div>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold max-w-sm mx-auto leading-relaxed italic">
              &quot;Ciao esploratore! Pronto a unirti al branco e iniziare la tua avventura?&quot;
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <footer className="mt-12 space-y-4 pb-8">
          <Link href="/dashboard" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer text-lg">
            <span>Inizia l&apos;Avventura</span>
            <span className="material-icons-round">arrow_forward</span>
          </Link>
          
          <button className="w-full bg-white/40 dark:bg-white/5 border-2 border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer">
            <span>Ho già un account</span>
          </button>
          
          {/* Visual Progress dots */}
          <div className="flex justify-center gap-3 pt-6">
            <div className="w-8 h-2.5 bg-primary rounded-full shadow-sm shadow-primary/20"></div>
            <div className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
          </div>
        </footer>
      </div>
    </main>
  );
}
