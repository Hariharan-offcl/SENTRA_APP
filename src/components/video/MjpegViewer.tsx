import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface MjpegViewerProps {
  url: string;
  style?: any;
}

export const MjpegViewer = ({ url, style }: MjpegViewerProps) => {
  if (!url) return <View style={[styles.placeholder, style]} />;

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        scrollEnabled={false}
        overScrollMode="never"
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  webview: {
    backgroundColor: '#000',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  placeholder: {
    backgroundColor: '#1C2D40',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
