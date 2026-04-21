import { useHomeStore } from '../store';
import { 
  Lightbulb, 
  Thermometer, 
  Zap, 
  Shield, 
  Moon, 
  Sun, 
  Camera,
  Activity,
  Settings,
  Bell,
  Cpu,
  Globe,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';
import EnergyChart from './EnergyChart';

export default function Dashboard() {
  const { 
    lights, 
    toggleLight, 
    temperature, 
    setTemperature, 
    mode, 
    setMode, 
    cameraView, 
    setCameraView,
    energyConsumption,
    notifications
  } = useHomeStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans text-brand-text">
      {/* Sidebar - Left Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-brand-surface border-r border-brand-border flex flex-col pointer-events-auto">
        <div className="p-6 border-b border-brand-border">
          <div className="flex items-center space-x-3 mb-1">
            <div className={`w-3 h-3 rounded-full animate-pulse ${mode === 'day' ? 'bg-orange-500' : 'bg-brand-accent'}`} />
            <h1 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Domus OS v2.4</h1>
          </div>
          <p className="text-[10px] text-brand-muted font-mono tracking-wider">DT-EXP // SERIAL: 8842-X</p>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto scrollbar-hide">
          <div className="px-6 mb-8 text-center bg-brand-panel/30 py-4 mx-4 rounded-lg border border-brand-border/50">
             <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-2">Sync Status</p>
             <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-brand-accent">
               <span className="animate-pulse">●</span> OPTIMAL
             </div>
          </div>

          <div className="px-6 mb-8">
            <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-4 opacity-50">Core Viewports</p>
            <div className="space-y-2">
              <ModuleButton 
                active={cameraView === 'home'} 
                onClick={() => setCameraView('home')} 
                label="Exterior Perimeter" 
                icon={<Globe size={14} />} 
              />
              <ModuleButton 
                active={cameraView === 'living'} 
                onClick={() => setCameraView('living')} 
                label="Living Quarters" 
                icon={<Cpu size={14} />} 
              />
              <ModuleButton 
                active={cameraView === 'bedroom'} 
                onClick={() => setCameraView('bedroom')} 
                label="Sleeper Pod" 
                icon={<Database size={14} />} 
              />
              <ModuleButton 
                active={cameraView === 'security'} 
                onClick={() => setCameraView('security')} 
                label="Security Mesh" 
                icon={<Shield size={14} />} 
              />
            </div>
          </div>

          <div className="px-6 mb-8">
            <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-4 opacity-50">Local Sensors</p>
            <div className="space-y-4">
              <ProgressStat label="Avg Temp" value={`${temperature}°C`} progress={(temperature - 16) / 14 * 100} color="accent" />
              <ProgressStat label="Humidity" value="48%" progress={48} color="blue" />
            </div>
          </div>
        </nav>

        <div className="p-6 bg-brand-panel border-t border-brand-border">
          <div className="flex justify-between items-center bg-brand-bg rounded-full p-1 border border-brand-border">
            <button 
              onClick={() => setMode('day')}
              className={`flex-1 flex items-center justify-center py-2 rounded-full transition-all ${mode === 'day' ? 'bg-brand-accent text-white shadow-lg' : 'text-brand-muted hover:text-white'}`}
            >
              <Sun size={14} />
            </button>
            <button 
              onClick={() => setMode('night')}
              className={`flex-1 flex items-center justify-center py-2 rounded-full transition-all ${mode === 'night' ? 'bg-indigo-600 text-white shadow-lg' : 'text-brand-muted hover:text-white'}`}
            >
              <Moon size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 flex flex-col relative pointer-events-none">
        {/* Header - System Stats */}
        <header className="h-16 border-b border-brand-border flex items-center justify-between px-8 bg-brand-surface/80 backdrop-blur-md z-40 pointer-events-auto">
          <div className="flex space-x-12">
            <StatItem label="Consumption" value={`${energyConsumption.toFixed(0)}W`} />
            <StatItem label="Latency" value="4ms" />
            <StatItem label="Uptime" value="128d 14h" />
          </div>
          <div className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded text-[10px] text-brand-accent uppercase tracking-tighter">
            {mode === 'day' ? 'Optic Mode: Standard' : 'Thermal: Active'}
          </div>
        </header>

        {/* 3D Viewport - The Scene is under here */}
        <section className="flex-1 relative z-0 pointer-events-none">
          {/* This container allows 3D interactions while HUD floats */}
        </section>

        {/* HUD Overlay - Right Side Floating Panels */}
        <div className="absolute top-20 right-8 bottom-20 w-80 pointer-events-none flex flex-col justify-end space-y-6 z-40">
          {/* Environment Controls Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="theme-glass p-6 rounded-xl pointer-events-auto shadow-2xl"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-6 flex items-center gap-2">
              <Settings size={14} /> Habitat Controls
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <DeviceButton active={lights.livingRoom} onClick={() => toggleLight('livingRoom')} label="Living" />
              <DeviceButton active={lights.bedroom} onClick={() => toggleLight('bedroom')} label="Bedroom" />
              <DeviceButton active={lights.kitchen} onClick={() => toggleLight('kitchen')} label="Kitchen" />
              <DeviceButton active={lights.security} onClick={() => toggleLight('security')} label="Security" color="red" />
            </div>
            
            <div className="mt-8 pt-6 border-t border-brand-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-brand-muted uppercase tracking-widest">Climate Target</span>
                <span className="text-sm font-mono text-brand-accent">{temperature}°C</span>
              </div>
              <input 
                type="range" 
                min="16" 
                max="30" 
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-1 bg-brand-border rounded-full appearance-none cursor-pointer accent-brand-accent"
              />
            </div>
          </motion.div>

          {/* Energy Usage Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="theme-glass p-5 rounded-xl pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Energy Pulse</h3>
              <span className="text-[10px] font-mono text-brand-accent">LIVE</span>
            </div>
            <div className="h-28">
              <EnergyChart />
            </div>
          </motion.div>

          {/* System Log Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="theme-glass p-5 rounded-xl flex flex-col h-48 pointer-events-auto"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-4 flex items-center gap-2">
              <Bell size={12} /> System Feed
            </h3>
            <div className="flex-1 overflow-y-auto font-mono text-[9px] space-y-2 pr-2 scrollbar-thin">
              {notifications.map((note, i) => (
                <p key={i} className={`flex gap-2 ${i === 0 ? 'text-brand-accent' : 'text-brand-muted'}`}>
                  <span className="opacity-40">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}]</span>
                  <span className="truncate">{note.split(' - ')[1] || note}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bar */}
        <footer className="h-12 border-t border-brand-border bg-brand-surface flex items-center px-8 justify-between z-40 pointer-events-auto">
          <div className="flex space-x-6 text-[10px] uppercase font-mono text-brand-muted">
            <span className="flex gap-2"><span className="opacity-50">LAT:</span> 42.88N</span>
            <span className="flex gap-2"><span className="opacity-50">LON:</span> 12.41E</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-[10px] font-mono text-brand-accent tracking-tighter">DATA_STREAM: 124.5 KB/s</div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1 bg-brand-border relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-brand-accent"
                  animate={{ width: `${(energyConsumption/250)*100}%` }}
                />
              </div>
              <span className="text-[9px] font-mono opacity-50">LOAD</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-left">
      <p className="text-[10px] uppercase text-brand-muted tracking-widest mb-0.5">{label}</p>
      <p className="text-xs font-mono font-bold text-white">{value}</p>
    </div>
  );
}

function ModuleButton({ active, onClick, label, icon }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 border ${
        active 
          ? 'bg-brand-panel border-brand-accent/40 text-white' 
          : 'bg-transparent border-transparent text-brand-muted hover:bg-brand-panel/50 hover:text-brand-text'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={active ? 'text-brand-accent' : 'text-brand-muted'}>{icon}</span>
        <span className="text-xs font-medium uppercase tracking-tight">{label}</span>
      </div>
      <div className={`w-1 h-4 rounded-full transition-all ${active ? 'bg-brand-accent scale-y-100' : 'bg-brand-border scale-y-50'}`} />
    </button>
  );
}

function DeviceButton({ active, onClick, label, color }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border transition-all text-left relative overflow-hidden group ${
        active 
          ? 'bg-brand-panel border-brand-accent/50 text-white' 
          : 'bg-brand-bg/50 border-brand-border text-brand-muted hover:border-brand-muted/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${active ? (color === "red" ? 'bg-red-500' : 'bg-brand-accent') : 'bg-brand-border'} transition-colors`} />
      </div>
      <div className={`text-[8px] mt-1 font-mono uppercase opacity-50 ${active ? 'block' : 'hidden'}`}>
        ACTIVE
      </div>
      {active && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-brand-accent w-full" />
      )}
    </button>
  );
}

function ProgressStat({ label, value, progress, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between text-[10px] mb-2 uppercase text-brand-muted tracking-tight group-hover:text-brand-text transition-colors">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-1 bg-brand-border rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full ${color === 'blue' ? 'bg-blue-500' : 'bg-brand-accent'}`} 
        />
      </div>
    </div>
  );
}

