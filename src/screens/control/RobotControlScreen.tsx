import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Slider } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { getRobotService } from '../../services/RobotService';

export default function RobotControlScreen() {
  const [mode, setMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [speed, setSpeed] = useState(0.5);

  const sendMoveCommand = async (dir: string) => {
    try {
      const service = getRobotService();
      await service.move(dir);
    } catch (e) {
      console.error('Move error:', e);
    }
  };

  const navigateToRoom = async (room: string) => {
    try {
      const service = getRobotService();
      await service.navigate(room);
    } catch (e) {
      console.error('Navigate error:', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Mode Switcher */}
      <View style={styles.modeSwitcher}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'AUTO' && styles.modeButtonActive]}
          onPress={() => setMode('AUTO')}
        >
          <Text style={styles.modeButtonText}>AUTO MODE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'MANUAL' && styles.modeButtonActive]}
          onPress={() => setMode('MANUAL')}
        >
          <Text style={styles.modeButtonText}>MANUAL MODE</Text>
        </TouchableOpacity>
      </View>

      {/* Manual Control */}
      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>Manual Control</Text>

        <View style={styles.dpad}>
          <TouchableOpacity
            style={styles.dpadButton}
            onPressIn={() => mode === 'MANUAL' && sendMoveCommand('forward')}
            onPressOut={() => sendMoveCommand('stop')}
          >
            <Text style={styles.dpadText}>▲ FORWARD</Text>
          </TouchableOpacity>

          <View style={styles.dpadMiddle}>
            <TouchableOpacity
              style={styles.dpadButton}
              onPressIn={() => mode === 'MANUAL' && sendMoveCommand('left')}
              onPressOut={() => sendMoveCommand('stop')}
            >
              <Text style={styles.dpadText}>◀ LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dpadButton, styles.stopButton]}
              onPress={() => sendMoveCommand('stop')}
            >
              <Text style={styles.dpadText}>⏹ STOP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dpadButton}
              onPressIn={() => mode === 'MANUAL' && sendMoveCommand('right')}
              onPressOut={() => sendMoveCommand('stop')}
            >
              <Text style={styles.dpadText}>▶ RIGHT</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.dpadButton}
            onPressIn={() => mode === 'MANUAL' && sendMoveCommand('backward')}
            onPressOut={() => sendMoveCommand('stop')}
          >
            <Text style={styles.dpadText}>▼ BACKWARD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Speed: {Math.round(speed * 100)}%</Text>
          {/* Using a basic View as a placeholder for a Slider for now since we aren't using a library for it */}
          <View style={styles.sliderPlaceholder}>
            <View style={[styles.sliderFill, { width: `${speed * 100}%` }]} />
          </View>
        </View>
      </View>

      {/* Room Navigation */}
      <View style={styles.navigationSection}>
        <Text style={styles.sectionTitle}>Send Robot To:</Text>
        <View style={styles.roomGrid}>
          {['Bedroom', 'Kitchen', 'Bathroom', 'Living Room'].map((room) => (
            <TouchableOpacity
              key={room}
              style={styles.roomButton}
              onPress={() => navigateToRoom(room)}
            >
              <Text style={styles.roomButtonText}>{room}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Obstacle Status */}
      <View style={styles.obstacleSection}>
        <Text style={styles.sectionTitle}>Obstacle Status</Text>
        <View style={styles.obstacleGrid}>
          <ObstacleItem label="Front" distance="45cm" color={Colors.accentGreen} />
          <ObstacleItem label="Rear" distance="120cm" color={Colors.accentGreen} />
          <ObstacleItem label="Right" distance="15cm" color={Colors.alertRed} />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function ObstacleItem({ label, distance, color }: { label: string; distance: string; color: string }) {
  return (
    <View style={styles.obstacleItem}>
      <Text style={styles.obstacleLabel}>{label}</Text>
      <Text style={[styles.obstacleValue, { color }]}>{distance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  modeSwitcher: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 5,
    marginBottom: 30,
    marginTop: 20,
  },
  modeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: Colors.primary,
  },
  modeButtonText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  controlSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  dpad: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  dpadMiddle: {
    flexDirection: 'row',
    gap: 10,
  },
  dpadButton: {
    backgroundColor: Colors.card,
    width: 100,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: Colors.alertRed,
    borderColor: Colors.alertRed,
  },
  dpadText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sliderContainer: {
    marginTop: 20,
  },
  sliderLabel: {
    color: Colors.textSecondary,
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderPlaceholder: {
    height: 10,
    backgroundColor: Colors.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  navigationSection: {
    marginBottom: 30,
  },
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  roomButton: {
    backgroundColor: Colors.card,
    width: '48%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 10,
  },
  roomButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  obstacleSection: {
    marginBottom: 30,
  },
  obstacleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  obstacleItem: {
    alignItems: 'center',
  },
  obstacleLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  obstacleValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
