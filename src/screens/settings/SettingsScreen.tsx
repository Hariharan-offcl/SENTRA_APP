import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { useRobotStore } from '../../store/useRobotStore';

export default function SettingsScreen({ navigation }: any) {
  const { robotIp, setRobotIp, appMode, setAppMode } = useRobotStore();
  const [ip, setIp] = useState(robotIp);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Robot Connection</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Pi 5 IP Address</Text>
        <TextInput
          style={styles.input}
          value={ip}
          onChangeText={setIp}
          placeholder="192.168.1.xxx"
          placeholderTextColor={Colors.textSecondary}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setRobotIp(ip)}
        >
          <Text style={styles.buttonText}>Save & Test Connection</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Family Contact</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="+1 234 567 890" placeholderTextColor={Colors.textSecondary} />
        <Text style={styles.label}>Telegram Username</Text>
        <TextInput style={styles.input} placeholder="@username" placeholderTextColor={Colors.textSecondary} />
      </View>

      <Text style={styles.sectionTitle}>Authorized Faces</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.addFaceButton}
          onPress={() => navigation.navigate('FaceRegistration')}
        >
          <Text style={styles.addFaceText}>+ Add New Face</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Robot Behaviour</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Auto call on fall</Text>
          <TouchableOpacity style={styles.toggle}>
             <Text style={styles.toggleText}>ON</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Auto call on intruder</Text>
          <TouchableOpacity style={styles.toggle}>
             <Text style={styles.toggleText}>OFF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>App Mode</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.modeButton, appMode === 'ROBOT' && styles.modeButtonActive]}
          onPress={() => setAppMode('ROBOT')}
        >
          <Text style={styles.modeButtonText}>ROBOT MODE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, appMode === 'FAMILY' && styles.modeButtonActive]}
          onPress={() => setAppMode('FAMILY')}
        >
          <Text style={styles.modeButtonText}>FAMILY MODE</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 25,
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 15,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.background,
    color: Colors.textPrimary,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addFaceButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addFaceText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggle: {
    width: 50,
    height: 25,
    backgroundColor: Colors.accentGreen,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  modeButtonActive: {
    backgroundColor: Colors.primary,
  },
  modeButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
});
