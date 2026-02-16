import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
      {/* iOS Phone Container */}
      <div className="w-full max-w-[390px] h-[844px] bg-background-light dark:bg-background-dark relative overflow-hidden flex flex-col shadow-2xl rounded-xl border-[8px] border-slate-200 dark:border-slate-800">
        {/* Subtle Tech Background */}
        <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none"></div>
        
        {/* Top Status Bar Area (Spacer for iOS) */}
        <div className="h-12 w-full flex justify-center items-end pb-2">
          <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>

        {/* Header / Logo Section */}
        <header className="relative z-10 px-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">smart_toy</span>
            </div>
            <span className="text-primary font-extrabold text-xl tracking-tight uppercase">Branco</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            L&apos;Apprendista <br />
            <span className="text-primary">del Branco</span>
          </h1>
        </header>

        {/* Main Content Area: The Robot Wolf */}
        <main className="relative flex-1 flex flex-col items-center justify-center px-8">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          
          {/* Character Illustration Container */}
          <div className="relative w-full aspect-square flex items-center justify-center robot-glow">
            {/* Glowing Ear "Antennas" */}
            <div className="absolute top-[20%] left-[32%] -rotate-12 ear-glow">
              <div className="w-4 h-8 bg-primary rounded-full opacity-80"></div>
            </div>
            <div className="absolute top-[20%] right-[32%] rotate-12 ear-glow">
              <div className="w-4 h-8 bg-primary rounded-full opacity-80"></div>
            </div>
            
            {/* 3D Robot Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Friendly minimalist white robot wolf" 
              className="w-64 h-64 object-contain relative z-10 rounded-xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6A100XuCMg500YWBHSILhb9nSOgMNY2G0P4VvhUI_jXvSdf5IuBUqK2J97tnUHuvhaDQDkc_xdYTAdcBxGdIEJgasQQsNx48Sx9OYfiTfFlI0nnS_hvNVpwAHeNX5NzwYd23a5PTSCFmsgh939m1m9tVpnK0EF04R3d2p5aH3yYWYBc29a-TPratOHl2LdGSTrNxWqy9KMRe_Hc1BQPyJKh0G9cOLxHlk91hE5H4RfVVpjiTV8dlHd_KntW2NoHcnKGJMdpE-If_LLBdhEAE" 
            />
            
            {/* Floor Shadow */}
            <div className="absolute bottom-10 w-40 h-6 bg-black/5 dark:bg-white/5 rounded-full blur-lg"></div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mt-6 z-10">
            <div className="inline-flex items-center gap-1 bg-accent-yellow/10 text-accent-yellow px-3 py-1 rounded-full mb-4">
              <span className="material-icons-round text-sm">stars</span>
              <span className="text-xs font-bold uppercase tracking-wider">Level 1: New Member</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Hello explorer! Ready to join the pack and start your learning adventure?
            </p>
          </div>
        </main>

        {/* Footer Actions */}
        <footer className="relative z-10 px-8 pb-12 space-y-4">
          {/* Primary Action */}
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer">
            <span>Start Your Adventure</span>
            <span className="material-icons-round">arrow_forward</span>
          </button>
          
          {/* Secondary Action */}
          <button className="w-full bg-white/50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer">
            <span>I have an account</span>
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-6 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
          </div>
        </footer>

        {/* iOS Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </main>
  );
}
