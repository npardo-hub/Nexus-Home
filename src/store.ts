import { create } from 'zustand';

interface HomeState {
  lights: {
    livingRoom: boolean;
    bedroom: boolean;
    kitchen: boolean;
    security: boolean;
  };
  temperature: number;
  mode: 'day' | 'night';
  cameraView: 'home' | 'living' | 'bedroom' | 'security';
  energyConsumption: number;
  history: { time: string; consumption: number }[];
  notifications: string[];
  
  toggleLight: (room: keyof HomeState['lights']) => void;
  setTemperature: (temp: number) => void;
  setMode: (mode: 'day' | 'night') => void;
  setCameraView: (view: HomeState['cameraView']) => void;
  addNotification: (message: string) => void;
  updateEnergy: (newVal: number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  lights: {
    livingRoom: false,
    bedroom: false,
    kitchen: false,
    security: false,
  },
  temperature: 21,
  mode: 'day',
  cameraView: 'home',
  energyConsumption: 120,
  history: Array.from({ length: 20 }, (_, i) => ({
    time: `${10 + i}:00`,
    consumption: 100 + Math.random() * 50,
  })),
  notifications: ['System initialized', 'Welcome back, Commander'],

  toggleLight: (room) => set((state) => {
    const newVal = !state.lights[room];
    const roomName = room.charAt(0).toUpperCase() + room.slice(1).replace(/([A-Z])/g, ' $1');
    return {
      lights: { ...state.lights, [room]: newVal },
      notifications: [
        `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${roomName} lights ${newVal ? 'ON' : 'OFF'}`,
        ...state.notifications.slice(0, 9)
      ]
    };
  }),

  setTemperature: (temp) => set((state) => ({
    temperature: temp,
    notifications: [
      `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - Temperature set to ${temp}°C`,
      ...state.notifications.slice(0, 9)
    ]
  })),

  setMode: (mode) => set((state) => ({
    mode,
    notifications: [
      `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - Switching to ${mode} mode`,
      ...state.notifications.slice(0, 9)
    ]
  })),

  setCameraView: (cameraView) => set({ cameraView }),

  addNotification: (message) => set((state) => ({
    notifications: [`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${message}`, ...state.notifications.slice(0, 9)]
  })),

  updateEnergy: (newVal) => set((state) => {
    const newHistory = [...state.history.slice(1), { 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
      consumption: newVal 
    }];
    return { energyConsumption: newVal, history: newHistory };
  }),
}));
