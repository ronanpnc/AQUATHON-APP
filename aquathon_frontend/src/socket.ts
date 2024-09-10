"use client";
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_WS_BASE_URL;

export const socket = io(URL as string, { autoConnect: true, transports: ['websocket', 'pooling'] });
