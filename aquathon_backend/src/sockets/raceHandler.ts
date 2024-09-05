import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../types/sockets/raceSocket";
import { setRaceStartTime } from "../services/raceService";

type ServerProp = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents,SocketData>

const RaceHandler = (io:ServerProp, socket:Socket<ClientToServerEvents>) => {
    let raceID : string|null = null;
    let raceRoom = io.to(null);
    const startTime = (payload) => {
        setRaceStartTime(payload, "start").then( (data) => {
            raceRoom.emit("poolChanged", data?.startTime)
        }).catch((e) => console.log(e))
    };


    const resetTime = (payload) => {
        if (payload === undefined ||  null ) return;
        setRaceStartTime(payload, "reset").then( (data) => {
            raceRoom.emit("poolChanged", data?.startTime)
        }).catch((e) => console.log(e))
    };

    const subscribe = (payload) => {
        console.log(payload);
        socket.join(payload);
        raceID = payload;
        raceRoom = io.to(raceID);
        raceRoom.emit("subscribeAccepted")
    }

/// listen on event
    socket.on("startTime", startTime);
    socket.on("resetTime", resetTime);
    socket.on("subscribe", subscribe);
}

export default RaceHandler;
