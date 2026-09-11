import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../assets/theme/colors';

export default function FaceRegistrationScreen({ navigation }: any) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      navigation.goBack();
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Face</Text>
      <Text style={styles.subtitle}>Align your face within the frame and press capture</Text>

      <View style={styles.cameraFrame}>
        {isCapturing && <View style={styles.flash} />}
        <View style={styles.guideCircle} />
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Text style={styles.captureText}>{isCapturing ? 'Capturing...' : 'Capture Face'}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  cameraFrame: {
    width: 300,
    height: 300,
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  guideCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
  },
  captureButton: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 50,
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderWidth: 8,
    borderColor: Colors.card,
  },
  captureText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
