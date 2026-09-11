import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingParamList } from '../../navigation/OnboardingNavigator';
import { useRobotStore } from '../../store/useRobotStore';

type ConnectRobotScreenProps = {
  navigation: StackNavigationProp<OnboardingParamList, 'ConnectRobot'>;
};

export default function ConnectRobotScreen({ navigation }: ConnectRobotScreenProps) {
  const [ip, setIp] = useState('');
  const setRobotIp = useRobotStore((state) => state.setRobotIp);
  const setAppMode = useRobotStore((state) => state.setAppMode);

  const handleConnect = async () => {
    if (!ip) {
      Alert.alert('Error', 'Please enter an IP address');
      return;
    }
    // In a real app, we'd ping the Pi here
    setRobotIp(ip);
    // For now, we assume we are the family phone if we come from welcome
    setAppMode('FAMILY');
    navigation.navigate('Permissions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect to Robot</Text>
      <Text style={styles.subtitle}>Enter the Raspberry Pi 5 IP address</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. 192.168.1.100"
        placeholderTextColor={Colors.textSecondary}
        value={ip}
        onChangeText={setIp}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text style={styles.buttonText}>Test Connection</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: Colors.card,
    color: Colors.textPrimary,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
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
