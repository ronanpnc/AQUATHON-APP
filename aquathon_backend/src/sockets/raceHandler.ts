import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../types/sockets/race/race.socket";
import { setRaceStartTime } from "../services/raceService";
import { setTracking, setTrackingProp } from "../services/timeTrackingService";
import { StatusError } from "../types/common";

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
            console.log("hello");
        }).catch((e) => {throw new StatusError(e)})
    };


    const subscribe = (payload) => {
        console.log(payload);
        socket.join(payload);
        raceID = payload;
        raceRoom = io.to(raceID);
        raceRoom.emit("subscribeAccepted")
    }

    const stampTime = (payload:setTrackingProp) => {
        setTracking(payload).then((data) =>{
            raceRoom.emit("poolChanged", data)
        })
    }


   // reset for 1-step
    const resetTimeTracking = (payloay) => {

    }

   // reset for 1-step
    const resetAssignedTimeTracking = (payloay) => {

    }
/// listen on event
    socket.on("startTime", startTime);
    socket.on("resetTime", resetTime);
    socket.on("subscribe", subscribe);
    socket.on("stampTime", stampTime);
}

export default RaceHandler;
