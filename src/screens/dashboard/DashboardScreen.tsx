import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Colors } from '../../assets/theme/colors';
import { useRobotStore } from '../../store/useRobotStore';
import { getRobotService } from '../../services/RobotService';
import { MjpegViewer } from '../../components/video/MjpegViewer';

export default function DashboardScreen({ navigation }: any) {
  const {
    robotIp,
    robotMode,
    batteryLevel,
    connectionStatus,
    setRobotMode,
    setBatteryLevel,
    setConnectionStatus
  } = useRobotStore();

  const [lastEvent, setLastEvent] = useState('No recent events');
  const [lastTimestamp, setLastTimestamp] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const service = getRobotService();
        const response = await service.getStatus();
        const data = response.data;

        setRobotMode(data.mode);
        setBatteryLevel(data.battery);
        setConnectionStatus('CONNECTED');

        if (data.last_event) {
          setLastEvent(data.last_event);
          setLastTimestamp(data.last_timestamp);
        }
      } catch (error) {
        setConnectionStatus('DISCONNECTED');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSendHelp = async () => {
    Alert.alert(
      'Confirm Emergency',
      'Are you sure you want to send an emergency alert?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'YES, SEND HELP',
          style: 'destructive',
          onPress: async () => {
            try {
              const service = getRobotService();
              await service.sendEmergency();
              Alert.alert('Sent', 'Emergency alert sent to family!');
            } catch (e) {
              Alert.alert('Error', 'Failed to send emergency alert');
            }
          }
        },
      ]
    );
  };

  const getStatusColor = (mode: string) => {
    switch (mode) {
      case 'IDLE': return Colors.accentGreen;
      case 'PATROL': return Colors.primary;
      case 'EMERGENCY': return Colors.alertRed;
      case 'SECURITY': return '#FFA500'; // Orange
      default: return Colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>SENTRA</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(robotMode) }]}>
            <Text style={styles.statusText}>{robotMode}</Text>
          </View>
        </View>

        <View style={styles.batteryContainer}>
          <Text style={styles.batteryText}>{batteryLevel}%</Text>
          <View style={styles.batteryIcon}>
            <View style={[styles.batteryLevelFill, { width: `${batteryLevel}%` }]} />
          </View>
        </View>
      </View>

      {/* Connection Status */}
      <View style={[styles.connectionBar, { backgroundColor: connectionStatus === 'CONNECTED' ? Colors.accentGreen : Colors.alertRed }]}>
        <Text style={styles.connectionText}>
          {connectionStatus === 'CONNECTED' ? 'Robot Online' : 'Robot Offline'}
        </Text>
      </View>

      {/* Middle Section */}
      <View style={styles.cameraSection}>
        <TouchableOpacity
          style={styles.thumbnailContainer}
          onPress={() => navigation.navigate('LiveView')}
        >
          <MjpegViewer
            url={`http://${robotIp}:5000/camera/stream`}
            style={styles.thumbnail}
          />
          <View style={styles.thumbnailOverlay}>
            <Text style={styles.thumbnailText}>Tap for Live View</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.eventCard}>
          <Text style={styles.eventLabel}>Last Event</Text>
          <Text style={styles.eventValue}>{lastEvent}</Text>
          <Text style={styles.eventTimestamp}>{lastTimestamp}</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleSendHelp}>
        <Text style={styles.emergencyButtonText}>SEND HELP NOW</Text>
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('LiveView')}>
          <Text style={styles.actionButtonText}>Live View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Control')}>
          <Text style={styles.actionButtonText}>Control</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Alerts')}>
          <Text style={styles.actionButtonText}>Alerts</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  batteryContainer: {
    alignItems: 'center',
  },
  batteryText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  batteryIcon: {
    width: 40,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.textPrimary,
    borderRadius: 3,
    padding: 2,
    justifyContent: 'center',
  },
  batteryLevelFill: {
    height: '100%',
    backgroundColor: Colors.accentGreen,
    borderRadius: 1,
  },
  connectionBar: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  connectionText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cameraSection: {
    gap: 20,
    marginBottom: 30,
  },
  thumbnailContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    alignItems: 'center',
  },
  thumbnailText: {
    color: '#FFF',
    fontSize: 14,
  },
  eventCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eventLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  eventValue: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTimestamp: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  emergencyButton: {
    backgroundColor: Colors.alertRed,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: Colors.alertRed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  emergencyButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
});
