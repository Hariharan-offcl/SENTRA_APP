import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../assets/theme/colors';

interface AlertEvent {
  id: string;
  type: 'FALL' | 'INTRUDER' | 'SYSTEM';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  description: string;
  duration?: string;
  photoUrl?: string;
}

const MOCK_EVENTS: AlertEvent[] = [
  {
    id: '1',
    type: 'FALL',
    severity: 'HIGH',
    timestamp: 'Today 14:32',
    description: 'Fall detected in Bedroom. Robot navigated to person.',
    duration: '4 mins 20 sec',
  },
  {
    id: '2',
    type: 'INTRUDER',
    severity: 'HIGH',
    timestamp: 'Yesterday 23:10',
    description: 'Unknown person detected in Living Room.',
    photoUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    type: 'SYSTEM',
    severity: 'LOW',
    timestamp: '2 days ago',
    description: 'Battery low: 15%. Please charge.',
  },
];

export default function AlertsHistoryScreen({ navigation }: any) {
  const [filter, setFilter] = useState<'All' | 'FALL' | 'INTRUDER' | 'SYSTEM'>('All');

  const filteredEvents = MOCK_EVENTS.filter(e => filter === 'All' || e.type === filter);

  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        {['All', 'FALL', 'INTRUDER', 'SYSTEM'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f as any)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
          >
            <View style={styles.eventHeader}>
              <Text style={[styles.eventType, { color: item.severity === 'HIGH' ? Colors.alertRed : Colors.textPrimary }]}>
                {item.severity === 'HIGH' ? '🔴 ' : '⚪ '} {item.type} DETECTED
              </Text>
              <Text style={styles.eventTime}>{item.timestamp}</Text>
            </View>
            <Text style={styles.eventDesc}>{item.description}</Text>
            {item.duration && <Text style={styles.eventDetail}>Duration: {item.duration}</Text>}

            <View style={styles.eventActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>📞 Call</Text>
              </TouchableOpacity>
              {item.photoUrl && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>📷 View Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  filterBar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#FFF',
  },
  eventCard: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eventType: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventTime: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  eventDesc: {
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 10,
  },
  eventDetail: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 15,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
