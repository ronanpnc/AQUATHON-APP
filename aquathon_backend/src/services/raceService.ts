import { Race } from "../models/raceModel"

export const getRaces = async () => {
    const data = await Race.find({}).catch(error => {throw error});
    return data;
}
export const getRace = async (id:string) => {
    const data = await Race.find({_id:id}).catch(error => {throw error});
    return data;
}

export const createRace = async () => {
    const new_race = new Race({name:"race1"});
    const res = await new_race.save().catch(error => {throw error});
    return res;
}

export const getRaceStartTime = async (id:string) => {
    const data = await Race.find({_id:id}).select("startTime").catch(error => {throw error});
    return data[0];
}

export const setRaceStartTime = async (id:string, status:"start" |"reset") => {
    const data = await Race.find({_id:id}).select("startTime").catch(error => {throw error});
    console.log(status);
    if (status == "start"){
        data[0].startTime = new Date();
    }else if (status == "reset"){
        data[0].startTime = null;
    }
    const res = await data[0].save().catch(error => {throw error});
    return res;
}
