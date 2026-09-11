import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { useRobotStore } from '../../store/useRobotStore';
import { MjpegViewer } from '../../components/video/MjpegViewer';

export default function LiveViewScreen() {
  const { robotIp, robotMode, batteryLevel } = useRobotStore();
  const [isMuted, setIsMuted] = useState(false);

  return (
    <View style={styles.container}>
      <MjpegViewer
        url={`http://${robotIp}:5000/camera/stream`}
        style={styles.fullscreenVideo}
      />

      {/* Top Overlay */}
      <View style={styles.topOverlay}>
        <View style={styles.statusPill}>
          <Text style={styles.pillText}>{robotMode}</Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.pillText}>Battery: {batteryLevel}%</Text>
        </View>
      </View>

      {/* Detection Overlays (Simulated) */}
      <View style={styles.detectionBox}>
        <View style={styles.boxBorder}>
          <Text style={styles.boxLabel}>Person: 98%</Text>
        </View>
      </View>

      {/* Bottom Sensor Panel */}
      <View style={styles.sensorPanel}>
        <SensorItem label="Front" value="45cm" color={Colors.accentGreen} />
        <SensorItem label="Rear" value="120cm" color={Colors.accentGreen} />
        <SensorItem label="Right" value="30cm" color="#FFA500" />
      </View>

      {/* Floating Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Text style={styles.controlText}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsMuted(!isMuted)}
        >
          <Text style={styles.controlText}>{isMuted ? '🔇 Unmute' : '🎙 Mute'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Text style={styles.controlText}>🔄 Cam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Text style={styles.controlText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SensorItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.sensorItem}>
      <Text style={styles.sensorLabel}>{label}: </Text>
      <Text style={[styles.sensorValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreenVideo: {
    flex: 1,
  },
  topOverlay: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusPill: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detectionBox: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: 150,
    height: 200,
  },
  boxBorder: {
    flex: 1,
    borderWidth: 3,
    borderColor: Colors.accentGreen,
    borderRadius: 10,
    padding: 5,
  },
  boxLabel: {
    color: Colors.accentGreen,
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
  },
  sensorPanel: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderRadius: 15,
  },
  sensorItem: {
    flexDirection: 'row',
  },
  sensorLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  sensorValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    gap: 15,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  controlText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
