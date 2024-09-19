'use client';

import { useEffect, useState } from 'react';

import { useEffect, useState } from "react";
import { createStore } from "zustand";

import { socket } from "../../socket";

export default function useRaceSocket({ raceId }: { raceId: string }) {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  useEffect(() => {
    socket.emit('subscribe', raceId);
  }, [raceId]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    const stampTime = () => {
      socket.emit('stampTime');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { isConnected };
}
