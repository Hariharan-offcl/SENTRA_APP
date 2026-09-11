import { NativeModules, Platform } from 'react-native';

const { RobotForegroundService } = NativeModules;

export const BackgroundService = {
  start: async () => {
    if (Platform.OS !== 'android') return;
    try {
      await RobotForegroundService?.start();
      console.log('SENTRA Background Service Started');
    } catch (e) {
      console.error('Failed to start background service:', e);
    }
  },
  stop: async () => {
    if (Platform.OS !== 'android') return;
    try {
      await RobotForegroundService?.stop();
      console.log('SENTRA Background Service Stopped');
    } catch (e) {
      console.error('Failed to stop background service:', e);
    }
  },
};
