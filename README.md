# SENTRA - Smart Emergency Navigation, Threat Recognition & Assistance

SENTRA is a React Native application designed for an AI-powered elderly care robot. It enables emergency monitoring, remote control, and real-time communication between the robot and the family.

## Features
- **Dual Modes**: Robot Phone (Monitoring/Call Initiation) and Family Phone (Alerts/Control).
- **Real-time Monitoring**: Live MJPEG stream from Raspberry Pi 5.
- **Emergency Calls**: WebRTC-powered video/audio calls triggered by AI event detection.
- **Robot Control**: Manual D-pad control and waypoint-based room navigation.
- **Android Backgrounding**: Foreground service and boot receiver for 24/7 monitoring.
- **Alert History**: Tracked event logs with photos and details.

## Tech Stack
- React Native + TypeScript
- Zustand (State Management)
- React Navigation
- WebRTC (Video Calling)
- Firebase Cloud Messaging (Push Notifications)
- Axios (REST API)
- WebSockets (Signaling Server)
- Android Foreground Services

## Setup Instructions

### Prerequisites
- Node.js
- React Native CLI
- Android Studio / SDK
- A Raspberry Pi 5 running the SENTRA backend (Flask API & SocketIO signaling)

### Installation
1. Clone the repository.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Setup Firebase:
   - Create a Firebase project.
   - Add an Android app.
   - Download `google-services.json` and place it in `android/app/`.

### Running the App
1. Connect an Android device.
2. Run the app:
   \`\`\`bash
   npx react-native run-android
   \`\`\`

## API Endpoints (Pi 5)
- `GET /status` - Robot state and battery.
- `GET /camera/stream` - MJPEG Stream.
- `POST /emergency` - Trigger SOS.
- `GET /move/<dir>` - Robot movement.
- `POST /navigate` - Waypoint navigation.
- `GET /faces` - Authorized faces.

## Configuration
- **Signaling Server**: Port 5001 (WebSocket).
- **REST API**: Port 5000 (HTTP).
