import { setTrackingProp } from "../../../services/timeTrackingService";

interface ISubscribe {
    raceId : string;
};



export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  // handshake for server to client
  subscribeAccepted : ()=> void;
  // update participant pool
  poolChanged :(value) => void;
}

export interface ClientToServerEvents {
  subscribe: (value:ISubscribe) => void ;
  startTime: (value) => void;
  resetTime: (value) => void;
  stampTime: (value: setTrackingProp) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
