import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens (will be created)
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import ConnectRobotScreen from '../screens/onboarding/ConnectRobotScreen';
import PermissionsScreen from '../screens/onboarding/PermissionsScreen';
import ReadyScreen from '../screens/onboarding/ReadyScreen';

export type OnboardingParamList = {
  Welcome: undefined;
  ConnectRobot: undefined;
  Permissions: undefined;
  Ready: undefined;
};

const Stack = createStackNavigator<OnboardingParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ConnectRobot" component={ConnectRobotScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="Ready" component={ReadyScreen} />
    </Stack.Navigator>
  );
}
