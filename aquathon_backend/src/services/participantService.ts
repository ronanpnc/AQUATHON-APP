import { Race } from "../models/raceModel";

export const getParticipants = async (id:string) => {
  const data = await Race.find(
    {_id: id},
    {participants:1}
  )
    .catch((error) => {
      throw new StatusError(error.message)
    })
    return [];
}

export const createParticipant = async () => {
    return [];
}
