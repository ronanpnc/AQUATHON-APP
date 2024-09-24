import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../types/sockets/race/race.socket";
import { setRaceStartTime } from "../services/raceService";
import {resetTracking, setTracking, setTrackingProp} from "../services/timeTrackingService";
import { StatusError } from "../types/common";
type ServerProp = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents,SocketData>


const RaceHandler = (io:ServerProp, socket:Socket<ClientToServerEvents>) => {
    let raceID : string|null = null;
    let raceRoom = io.to(null);
    const startTime = (payload) => {
        setRaceStartTime(payload, "start").then((data) => {
            raceRoom.emit("startTimeChanged", data?.startTime)
        }).catch((e) => console.log(e))
    };


    const resetTime = (payload) => {
        if (payload === undefined ||  null ) return;
        setRaceStartTime(payload, "reset").then( (data) => {
            raceRoom.emit("startTimeChanged", data?.startTime)
        }).catch((e) => {throw new StatusError(e)})
    };


    const subscribe = (payload) => {
        socket.join(payload);
        raceID = payload;
        raceRoom = io.to(raceID);
        raceRoom.emit("subscribeAccepted", {roomId: raceID})
    }

    const trackTime = (payload:setTrackingProp) => {
        setTracking(payload).then((data) =>{
            raceRoom.emit("poolChanged", data)
            console.log(data);
        }).catch(e => {
            console.log(e)
            raceRoom.emit("error",e)
        })
    }


   // reset for 1-step
    const resetTimeTracking = (payload:setTrackingProp) => {
        resetTracking(payload).then((data) =>{
            raceRoom.emit("poolChanged", data)
        }).catch(e => {
            console.log(e)
            raceRoom.emit("error",e)
        })
    }

//   // reset for 2-step
//    const resetAssignedTimeTracking = (payloay) => {

//    }
/// listen on event
    socket.on("startTime", startTime);
    socket.on("resetTime", resetTime);
    socket.on("subscribe", subscribe);
    socket.on("trackTime", trackTime);
    socket.on("resetTrackTime", resetTimeTracking);
}

export default RaceHandler;
