import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface MjpegViewerProps {
  url: string;
  style?: any;
}

export const MjpegViewer = ({ url, style }: MjpegViewerProps) => {
  // If no URL or IP is not set yet, show a placeholder instead of crashing WebView
  if (!url || url.includes('undefined') || url.includes(':5000/') && !url.split('//')[1]?.split(':')[0]) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>📷 No camera feed</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        scrollEnabled={false}
        overScrollMode="never"
        startInLoadingState={true}
        onError={() => {}} // silently handle camera offline
        renderError={() => (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📷 Camera offline</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#1C2D40',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
  },
});
