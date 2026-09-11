import axios from 'axios';
import { useRobotStore } from '../store/useRobotStore';

const createRobotApi = (baseUrl: string) => {
  const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });

  return {
    getStatus: () => api.get('/status'),
    getSensors: () => api.get('/sensors'),
    sendEmergency: () => api.post('/emergency'),
    sendKeyword: (word: string) => api.post('/keyword', { word }),
    move: (dir: string) => api.get(`/move/${dir}`),
    navigate: (room: string) => api.post('/navigate', { room }),
    getWaypoints: () => api.get('/waypoints'),
    saveWaypoint: () => api.post('/waypoint/save'),
    getBattery: () => api.get('/battery'),
    setMode: (mode: string) => api.post(`/mode/${mode}`),
    getFaces: () => api.get('/faces'),
    addFace: (data: any) => api.post('/face/add', data),
    deleteFace: (name: string) => api.delete(`/face/${name}`),
  };
};

// Since the IP can change, we'll use a function to get the API instance
export const getRobotService = () => {
  const { robotIp } = useRobotStore.getState();
  if (!robotIp) {
    throw new Error('Robot IP not configured');
  }
  return createRobotApi(`http://${robotIp}:5000`);
};
