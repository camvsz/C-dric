import React, { useState, useEffect } from 'react';
import TerminalHeader from './components/TerminalHeader';
import { MISSION_STEPS, FINAL_REVEAL } from './constants';
import { MapPin, Lock, Unlock, ArrowRight, CheckCircle, Terminal, AlertTriangle, RefreshCw, X } from 'lucide-react';

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    try {
      const saved = localStorage.getItem('op_azur_step');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  
  const [view, setView] = useState<'MISSION' | 'CODE' | 'FINAL'>(() => {
    try {
      const savedStep = localStorage.getItem('op_azur_step');
      const stepIdx = savedStep ? parseInt(savedStep, 10) : 0;
      return stepIdx >= MISSION_STEPS.length ? 'FINAL' : 'MISSION';
    } catch {
      return 'MISSION';
    }
  });

  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('op_azur_step', currentStepIndex.toString());
  }, [currentStepIndex]);

  const currentStep = MISSION_STEPS[currentStepIndex] || MISSION_STEPS[0];

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStep) return;

    const normalizedInput = inputCode.trim().toUpperCase();
    const normalizedCorrect = currentStep.unlockCode.toUpperCase();

    if (normalizedInput === normalizedCorrect) {
      setIsSuccess(true);
      setErrorMsg('');
      
      setTimeout(() => {
        setIsSuccess(false);
        setInputCode('');
        
        if (currentStep.isFinal) {
            setView('FINAL');
            setCurrentStepIndex(prev => prev + 1);
        } else {
            setCurrentStepIndex(prev => prev + 1);
            setView('MISSION');
        }
      }, 1500);
    } else {
      setErrorMsg('CODE INVALIDE');
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(300);
      }
    }
  };

  const handleResetRequest = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    // 1. Reset Storage
    try {
      localStorage.removeItem('op_azur_step');
    } catch (e) {
      console.error("Storage failed", e);
    }
    
    // 2. Reset React State immediately (Visual feedback is instant)
    setShowResetModal(false);
    setCurrentStepIndex(0);
    setView('MISSION');
    setInputCode('');
    setErrorMsg('');
    setIsSuccess(false);

    // 3. Attempt reload for a "fresh" start (optional but safer)
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const cancelReset = () => {
    setShowResetModal(false);
  };

  // --- RENDERING HELPERS ---

  const ResetModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-slate-900 border-2 border-red-600 w-full max-w-sm p-6 rounded shadow-[0_0_50px_rgba(220,38,38,0.4)] text-center relative overflow-hidden">
        {/* Animated background stripes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{backgroundImage: 'repeating-linear-gradient(45deg, #dc2626 0, #dc2626 10px, transparent 10px, transparent 20px)'}}>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-red-500 animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Zone Rouge</h2>
          <p className="text-red-200 mb-8 font-sans text-sm leading-relaxed">
            Êtes-vous certain de vouloir réinitialiser la mission ?<br/>
            Toute progression sera perdue.
          </p>
          
          <div className="flex flex-col gap-3">
            <button 
              type="button"
              onClick={confirmReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded uppercase tracking-[0.2em] shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw size={18} />
              Confirmer Reset
            </button>
            
            <button 
              type="button"
              onClick={cancelReset}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded uppercase tracking-wider transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // FINAL VIEW
  if (view === 'FINAL' || currentStepIndex >= MISSION_STEPS.length) {
    return (
      <div className="min-h-screen bg-black text-cyan-400 font-mono pb-10">
        <TerminalHeader />
        <div className="p-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-[fadeIn_1s_ease-in]">
           <div className="mb-8 relative">
             <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse"></div>
             <CheckCircle size={80} className="text-green-500 relative z-10" />
           </div>
           
           <h1 className="text-3xl font-bold text-white tracking-[0.2em] mb-2 border-b-2 border-green-500 pb-2 shadow-[0_4px_10px_rgba(34,197,94,0.3)]">
             {FINAL_REVEAL.title}
           </h1>
           <div className="text-xs text-green-500 mb-8 uppercase tracking-widest">Opération Azur Terminée</div>

           <div className="bg-slate-900/80 p-6 border border-green-500/30 rounded-lg w-full max-w-md shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
             <div className="flex items-center gap-2 mb-6 text-green-400 text-sm uppercase tracking-wider border-b border-green-900/50 pb-2">
               <MapPin size={16} />
               {FINAL_REVEAL.locationName}
             </div>
             <p className="text-lg text-green-50 leading-relaxed whitespace-pre-wrap font-sans text-left">
               {FINAL_REVEAL.message}
             </p>
           </div>
           
           <button 
             onClick={handleResetRequest} 
             className="mt-12 group flex items-center gap-2 px-6 py-3 border border-red-900/30 rounded bg-red-950/10 hover:bg-red-900/30 text-red-800 hover:text-red-500 transition-all uppercase tracking-widest text-xs cursor-pointer"
           >
             <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
             SYSTEM RESET
           </button>
        </div>
        {showResetModal && <ResetModal />}
      </div>
    );
  }

  // CODE ENTRY VIEW
  if (view === 'CODE') {
    return (
      <div className="min-h-screen bg-black text-cyan-400 font-mono">
        <TerminalHeader />
        <div className="p-6 max-w-md mx-auto min-h-[80vh] flex flex-col">
          <button 
            onClick={() => { setView('MISSION'); setErrorMsg(''); setInputCode(''); }}
            className="mb-6 flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider cursor-pointer"
          >
            ← Retour Mission
          </button>

          <div className="flex-1 flex flex-col justify-center">
            <div className="border border-cyan-900/50 bg-slate-900/30 p-8 rounded-xl relative overflow-hidden backdrop-blur-sm">
               
               {/* Success Overlay */}
               {isSuccess && (
                  <div className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center z-20 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                      <Unlock size={64} className="text-white mb-4 animate-bounce" />
                      <div className="text-white font-bold text-2xl tracking-widest border-2 border-white p-4 rounded uppercase">
                          Accès Autorisé
                      </div>
                  </div>
               )}

               <div className="flex justify-center mb-6">
                 <div className="relative">
                   <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 animate-pulse"></div>
                   <Lock size={48} className="text-cyan-500 relative z-10" />
                 </div>
               </div>

               <h2 className="text-center text-white text-lg tracking-[0.2em] mb-1">SÉCURITÉ</h2>
               <div className="text-center text-cyan-700 text-xs mb-8 uppercase">Niveau {currentStep.id} // Encryptage actif</div>

               <form onSubmit={handleCodeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs text-cyan-600 mb-2 uppercase tracking-wider">Entrer le code d'accès</label>
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => {
                          setInputCode(e.target.value); 
                          setErrorMsg('');
                      }}
                      placeholder="____"
                      className="w-full bg-black border-2 border-cyan-800 focus:border-cyan-400 p-4 text-center text-3xl text-white tracking-[0.5em] focus:outline-none transition-all placeholder:text-slate-800 uppercase rounded"
                      autoComplete="off"
                    />
                  </div>

                  {errorMsg && (
                      <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-bold bg-red-950/20 p-3 rounded border border-red-900/50 animate-shake">
                          <AlertTriangle size={16} />
                          {errorMsg}
                      </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-700 p-4 rounded uppercase tracking-[0.2em] font-bold transition-all active:scale-95 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-4 cursor-pointer"
                  >
                    Valider
                  </button>
               </form>
               
               <p className="text-center text-slate-600 text-[10px] mt-6">
                 NOTE: LE CODE EST FOURNI PAR LE CONTACT SUR LE TERRAIN.
               </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MISSION VIEW
  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono pb-32">
      <TerminalHeader />
      
      <main className="p-5 max-w-lg mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider mb-4">
            <span>Progression de la mission</span>
            <span>{Math.round((currentStepIndex / MISSION_STEPS.length) * 100)}%</span>
        </div>
        <div className="h-1 bg-slate-900 w-full flex gap-0.5 rounded-full overflow-hidden">
            {MISSION_STEPS.map((step, idx) => (
                <div 
                    key={step.id} 
                    className={`h-full flex-1 transition-all duration-500 ${idx <= currentStepIndex ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-800'}`}
                />
            ))}
        </div>

        {/* Location Header */}
        <div className="relative border-l-4 border-cyan-600 pl-4 py-2 mt-6">
            <h2 className="text-xs text-cyan-700 uppercase tracking-widest mb-1">Cible Actuelle</h2>
            <div className="flex items-start gap-6">
                <div className="mt-1 relative">
                    <span className="absolute flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white uppercase leading-none mb-2">{currentStep.locationName}</h1>
                    <p className="text-sm text-slate-400 font-sans leading-tight">{currentStep.context}</p>
                </div>
            </div>
        </div>

        {/* Clue Box */}
        <div className="relative group mt-8">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-xl opacity-50 blur-sm"></div>
            <div className="relative bg-slate-900/80 border border-slate-700 p-8 rounded-xl shadow-xl overflow-hidden">
                {/* Decorative Background Quotes - IT Style */}
                <span className="absolute -top-6 -left-2 text-9xl text-cyan-500/10 font-mono leading-none select-none pointer-events-none">"</span>
                <span className="absolute -bottom-12 -right-2 text-9xl text-cyan-500/10 font-mono leading-none select-none pointer-events-none">"</span>

                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2 relative z-10">
                    <div className="flex items-center gap-2 text-cyan-300">
                        <Terminal size={16} />
                        <span className="text-xs font-bold tracking-wider uppercase">Message Sécurisé</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{new Date().toLocaleDateString()}</span>
                </div>
                <p className="text-lg text-slate-100 leading-relaxed font-mono relative z-10">
                    {currentStep.clue}
                </p>
            </div>
        </div>

        {/* CTA Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-30">
            <button
                onClick={() => setView('CODE')}
                className="w-full max-w-lg mx-auto bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-4 px-6 rounded shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-wider cursor-pointer"
            >
                <Unlock size={20} />
                <span>{currentStep.isFinal ? "Code Mission Final" : "Entrer Code Étape"}</span>
                <ArrowRight size={20} />
            </button>
        </div>

        {/* Discrete Reset Button in Mission View */}
        <div className="mt-12 text-center pb-24 opacity-50 hover:opacity-100 transition-opacity">
           <button 
             onClick={handleResetRequest} 
             className="px-4 py-3 text-[10px] text-red-500 uppercase tracking-widest border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/40 cursor-pointer"
           >
             [ Réinitialiser la mission ]
           </button>
        </div>
      </main>
      
      {showResetModal && <ResetModal />}
    </div>
  );
}