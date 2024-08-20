import { Competitor } from "../models/competitorModel"

export const getCompetitors = async () => {
    const data = await Competitor.find({}).catch(error => {throw error});
    return data;
}

export const createCompetitor = async () => {
    const new_competitor = new Competitor({name:"race1"});
    const res = await new_competitor.save().catch(error => {throw error});
    return res;
}
