import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingParamList } from '../../navigation/OnboardingNavigator';

type PermissionsScreenProps = {
  navigation: StackNavigationProp<OnboardingParamList, 'Permissions'>;
};

export default function PermissionsScreen({ navigation }: PermissionsScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Permissions</Text>
      <Text style={styles.subtitle}>SENTRA needs these to keep your family safe</Text>

      <View style={styles.permissionCard}>
        <Text style={styles.permissionTitle}>🎙 Microphone</Text>
        <Text style={styles.permissionDesc}>Used for voice keyword detection and emergency calls.</Text>
      </View>

      <View style={styles.permissionCard}>
        <Text style={styles.permissionTitle}>📷 Camera</Text>
        <Text style={styles.permissionDesc}>Used for face registration and video calling.</Text>
      </View>

      <View style={styles.permissionCard}>
        <Text style={styles.permissionTitle}>🔔 Notifications</Text>
        <Text style={styles.permissionDesc}>Required for immediate emergency alerts.</Text>
      </View>

      <View style={styles.permissionCard}>
        <Text style={styles.permissionTitle}>🔋 Battery Optimization</Text>
        <Text style={styles.permissionDesc}>Allows the Robot phone to run in background without being killed.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ready')}>
        <Text style={styles.buttonText}>Grant All Permissions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
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
  permissionCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    width: '100%',
    marginBottom: 15,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  permissionDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
