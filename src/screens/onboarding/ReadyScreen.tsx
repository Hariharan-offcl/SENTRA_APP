import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingParamList } from '../../navigation/OnboardingNavigator';

type ReadyScreenProps = {
  navigation: StackNavigationProp<OnboardingParamList, 'Ready'>;
};

export default function ReadyScreen({ navigation }: ReadyScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are all set!</Text>
      <Text style={styles.subtitle}>
        SENTRA is now connected and monitoring. You can now use the dashboard to check on your robot.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
