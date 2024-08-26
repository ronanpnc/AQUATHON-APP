"use client"
import { useState, useEffect } from 'react';
import socket from 'socket.io-client';


const useSocket = (serverUrl:string) => {
    const [socket, setSocket] = useState(0);
    const [isConnected, setConnected] = useState(false);

    useEffect(() => {
        const client = socket(serverUrl);
        client.on("connect", () => setConnected(true));
        client.on("disconnect", () => setConnected(false));

    }, [serverUrl, isConnected]);

    return { temp, isConnected };
}

export default  useSocket;
