import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../assets/theme/colors';

// Import screens (will be created)
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import LiveViewScreen from '../screens/liveview/LiveViewScreen';
import RobotControlScreen from '../screens/control/RobotControlScreen';
import AlertsHistoryScreen from '../screens/history/AlertsHistoryScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type MainTabParamList = {
  Dashboard: undefined;
  LiveView: undefined;
  Control: undefined;
  Alerts: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.card, borderTopColor: Colors.border },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        headerStyle: { backgroundColor: Colors.background, borderBottomColor: Colors.border },
        headerTintColor: Colors.textPrimary,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="LiveView" component={LiveViewScreen} options={{ title: 'Live' }} />
      <Tab.Screen name="Control" component={RobotControlScreen} options={{ title: 'Control' }} />
      <Tab.Screen name="Alerts" component={AlertsHistoryScreen} options={{ title: 'Alerts' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
