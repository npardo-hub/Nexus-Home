/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Scene from './components/Scene';
import Dashboard from './components/Dashboard';
import { useHomeStore } from './store';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const { updateEnergy, energyConsumption, lights } = useHomeStore();

  // Energy Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Base consumption based on lights
      const activeLights = Object.values(lights).filter(v => v).length;
      const baseLoad = 80 + (activeLights * 15);
      
      // Add random noise
      const noise = (Math.random() - 0.5) * 10;
      const newVal = Math.max(50, baseLoad + noise);
      
      updateEnergy(newVal);
    }, 3000);

    return () => clearInterval(interval);
  }, [updateEnergy, lights]);

  return (
    <main className="relative w-screen h-screen bg-brand-bg flex overflow-hidden">
      {/* 3D Visualizer Layer - Pushed right to accommodate sidebar */}
      <div className="absolute inset-0 left-72 z-0">
        <Scene />
      </div>

      {/* Interface Layer - Provides layout and overlays */}
      <Dashboard />

      {/* Global Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat z-10" />
    </main>
  );
}

