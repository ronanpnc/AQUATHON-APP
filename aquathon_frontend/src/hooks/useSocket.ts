import { useEffect,useState } from 'react';
import socket from 'socket.io-client';


const useSocket = (serverUrl:string) => {
    const [isConnected, setConnected] = useState(false);

    useEffect(() => {
        const client = socket(serverUrl);
        client.on("connect", () => setConnected(true));
        client.on("disconnect", () => setConnected(false));

    }, [serverUrl, isConnected]);

    return {isConnected };
}

export default  useSocket;
