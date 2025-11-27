import React, { useState, useEffect } from 'react';
import { ShieldAlert, Wifi, Battery } from 'lucide-react';
import { AGENT_NAME, AGENT_CODENAME } from '../constants';

const TerminalHeader: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-900 border-b-2 border-cyan-500 p-4 shadow-lg shadow-cyan-500/20 sticky top-0 z-50">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-cyan-400">
          <ShieldAlert size={20} className="animate-pulse text-red-500" />
          <span className="font-bold tracking-widest text-sm text-red-500">TOP SECRET // EYES ONLY</span>
        </div>
        <div className="flex gap-3 text-xs text-cyan-600">
          <Wifi size={16} />
          <Battery size={16} />
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-slate-400">AGENT</div>
          <div className="text-lg font-bold text-white uppercase">{AGENT_NAME} <span className="text-cyan-500">"{AGENT_CODENAME}"</span></div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">LOCAL TIME</div>
          <div className="text-lg font-bold text-cyan-400 font-mono">
            {time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;