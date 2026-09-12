import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootStack';
import { Colors } from './src/assets/theme/colors';
import messaging from '@react-native-firebase/messaging';

// Register background message handler at app root level (required by Firebase)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);
});

function App() {
  useEffect(() => {
    // Request notification permission on startup
    messaging().requestPermission().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
