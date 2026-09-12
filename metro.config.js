const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Block the mock server file — it uses Node.js built-ins (http, net, etc.)
    // that don't exist in the React Native JS environment and would cause bundle errors.
    blockList: [/mock-robot-server\.js$/],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
