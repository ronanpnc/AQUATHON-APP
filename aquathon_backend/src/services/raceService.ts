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
