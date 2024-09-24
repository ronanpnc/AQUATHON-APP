import { createContext } from 'react';
import { io } from 'socket.io-client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Race } from '@/domains/race/interface';
import { WsEnpoint } from '@/socket';

export interface SocketState {
  // connection state
  // race info
  roomId: string | null;
  socketClient: ReturnType<typeof io>;
  transport: string;
  subscribe: (id: string) => void;
  resetTime: (id: string) => void;
  startTime: (id: string) => void;
  trackTime: ({ ...props }: trackTimeProp) => void;
  resetTrackTime: ({ ...props }: trackTimeProp) => void;
  disconnect: () => void;
}

type trackTimeProp = {
  raceId: string;
  segmentId: string;
  participantId: string;
  bib?: number;
};

interface RaceState {
  race: Race;
}

export type RaceRealTimeStore = ReturnType<typeof createRealTimeRaceStore>;

export const RaceRealTimeContext = createContext<RaceRealTimeStore | null>(null);

export const createRealTimeRaceStore = () => {
  const socket = io(WsEnpoint);

  // on socket connect
  function onConnect() {
    store.setState({ transport: socket.io.engine.transport.name });
    socket.io.engine.on('upgrade', (transport) => {
      store.setState({ transport: transport.name });
    });
  }

  const startTime = (id: string) => {
    socket.emit('startTime', id);
  };

  const resetTime = (id: string) => {
    socket.emit('resetTime', id);
  };

  const trackTime = (payload: trackTimeProp) => {
    socket.emit('trackTime', payload);
  };
  const resetTrackTime = (payload: trackTimeProp) => {
    socket.emit('resetTrackTime', payload);
  };
  const subscribe = (id: string) => {
    socket.emit('subscribe', id);
  };
  const disconnect = () => {
    socket.off('subscribeAccepted');
    socket.disconnect();
  };

  socket.on('subscribeAccepted', (value) => {
    store.setState({ roomId: value?.roomId });
  });
  socket.on('connected', onConnect);

  const store = create<SocketState>()(
    (set) => ({
      socketClient: socket,
      roomId: null,
      transport: 'N/A',
      subscribe,
      resetTime,
      startTime,
      disconnect,
      trackTime,
      resetTrackTime
    }),
  );
  return store;
};
