import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices
} from 'react-native-webrtc';
import { websocketService } from './WebSocketService';
import { useRobotStore } from '../store/useRobotStore';

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: any | null = null;

  async initiateCall() {
    this.peerConnection = new RTCPeerConnection(configuration);

    // Add local stream
    this.localStream = await mediaDevices.getUserMedia({ audio: true, video: true });
    this.localStream.getTracks().forEach((track: any) => {
      this.peerConnection?.addTrack(track, this.localStream!);
    });

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        websocketService.send({
          type: 'WEBRTC_SIGNAL',
          payload: { candidate: event.candidate },
        });
      }
    };

    // Create offer
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    websocketService.send({
      type: 'WEBRTC_SIGNAL',
      payload: { sdp: offer },
    });
  }

  async handleSignal(payload: any) {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection(configuration);

      // Setup ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          websocketService.send({
            type: 'WEBRTC_SIGNAL',
            payload: { candidate: event.candidate },
          });
        }
      };
    }

    if (payload.sdp) {
      const sdp = new RTCSessionDescription(payload.sdp);
      await this.peerConnection.setRemoteDescription(sdp);

      if (sdp.type === 'offer') {
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        websocketService.send({
          type: 'WEBRTC_SIGNAL',
          payload: { sdp: answer },
        });
      }
    } else if (payload.candidate) {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(payload.candidate));
    }
  }

  stopCall() {
    this.peerConnection?.close();
    this.peerConnection = null;
    this.localStream?.getTracks().forEach((track: any) => track.stop());
    this.localStream = null;
    useRobotStore.getState().setIsCalling(false);
  }

  getLocalStream() {
    return this.localStream;
  }
}

export const webrtcService = new WebRTCService();
