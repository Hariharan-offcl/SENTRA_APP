import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { webrtcService } from './WebRTCService';
import { useRobotStore } from '../store/useRobotStore';

export const NotificationService = {
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  },

  setupListeners() {
    // Foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      if (remoteMessage.data?.event === 'emergency_call') {
        Alert.alert(
          'SENTRA Emergency',
          'Emergency call from robot!',
          [
            { text: 'Decline', style: 'cancel' },
            {
              text: 'Answer',
              onPress: () => {
                useRobotStore.getState().setIsCalling(true);
                webrtcService.handleSignal(remoteMessage.data.signal);
              }
            },
          ]
        );
      }
    });

    // Background/Quit state messages
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open:', remoteMessage);
      // Navigate to Live View and Answer
    });
  },

  async getToken() {
    return await messaging().getToken();
  }
};
