import { useRobotStore } from '../store/useRobotStore';

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private url: string | null = null;

  connect() {
    const { robotIp } = useRobotStore.getState();
    if (!robotIp) return;

    this.url = `ws://${robotIp}:5001`;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('Connected to SENTRA signaling server');
      useRobotStore.getState().setConnectionStatus('CONNECTED');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = () => {
      console.log('Disconnected from signaling server');
      useRobotStore.getState().setConnectionStatus('DISCONNECTED');
      this.scheduleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  private handleMessage(data: any) {
    // Handle different message types
    switch (data.type) {
      case 'STATUS_UPDATE':
        useRobotStore.getState().setRobotMode(data.mode);
        useRobotStore.getState().setBatteryLevel(data.battery);
        break;
      case 'ALERT':
        // Trigger notification or state change
        console.log('Robot Alert:', data.event);
        break;
      case 'WEBRTC_SIGNAL':
        // Pass to WebRTC service
        console.log('WebRTC Signal:', data.payload);
        break;
      default:
        console.log('Unknown WS message:', data);
    }
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected. Cannot send data.');
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 5000);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService();
