import { setTrackingProp } from "../../../services/timeTrackingService";

interface ISubscribe {
    raceId : string;
};



export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  // handshake for server to client
  subscribeAccepted : ({roomId}: {roomId: string}) => void;

  // race start time update
  startTimeChanged :(value) => void;
  // update participant pool
  poolChanged :(value) => void;
  // update 2-step pool
  stampPoolChanged :(value) => void;
  error :(e:Error) => void;
}

export interface ClientToServerEvents {
  subscribe: (value:ISubscribe) => void ;
  startTime: (value) => void;
  resetTime: (value) => void;
  trackTime: (value: setTrackingProp) => void;
  resetTrackTime: (value: setTrackingProp) => void;
  unassignedStamp: (value: setTrackingProp) => void;
  assignStamp: (value: setTrackingProp) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
