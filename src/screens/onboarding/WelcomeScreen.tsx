import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingParamList } from '../../navigation/OnboardingNavigator';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<OnboardingParamList, 'Welcome'>;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SENTRA</Text>
      <Text style={styles.subtitle}>Elderly Care Robot</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ConnectRobot')}
        >
          <Text style={styles.buttonText}>🤖 This is the ROBOT phone</Text>
          <Text style={styles.buttonSubtext}>Mounts on robot, always listening</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ConnectRobot')}
        >
          <Text style={styles.buttonText}>👨‍👩‍👧 This is the FAMILY phone</Text>
          <Text style={styles.buttonSubtext}>Receives alerts and video calls</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
