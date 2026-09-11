import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RobotMode = 'IDLE' | 'PATROL' | 'EMERGENCY' | 'SECURITY';
export type AppMode = 'ROBOT' | 'FAMILY';
export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';

interface RobotState {
  robotIp: string;
  appMode: AppMode | null;
  connectionStatus: ConnectionStatus;
  robotMode: RobotMode;
  batteryLevel: number;
  isCalling: boolean;
  activeStreamUrl: string;

  // Actions
  setRobotIp: (ip: string) => void;
  setAppMode: (mode: AppMode) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setRobotMode: (mode: RobotMode) => void;
  setBatteryLevel: (level: number) => void;
  setIsCalling: (isCalling: boolean) => void;
  setActiveStreamUrl: (url: string) => void;
}

export const useRobotStore = create<RobotState>()(
  persist(
    (set) => ({
      robotIp: '',
      appMode: null,
      connectionStatus: 'DISCONNECTED',
      robotMode: 'IDLE',
      batteryLevel: 100,
      isCalling: false,
      activeStreamUrl: '',

      setRobotIp: (robotIp) => set({ robotIp }),
      setAppMode: (appMode) => set({ appMode }),
      setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
      setRobotMode: (robotMode) => set({ robotMode }),
      setBatteryLevel: (batteryLevel) => set({ batteryLevel }),
      setIsCalling: (isCalling) => set({ isCalling }),
      setActiveStreamUrl: (activeStreamUrl) => set({ activeStreamUrl }),
    }),
    {
      name: 'sentra-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
