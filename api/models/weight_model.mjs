import { UserWeight } from "../data/app.data.mjs";

/*
    * Add
*/
const addWeight = async (user, weight_lbs) => {
    const date = new Date();
    const day = date.getUTCDay();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const fullDate = `${month}-${day}-${year}`;
    const weight = new UserWeight({user, weight_lbs, date: fullDate});
    return weight.save();
}

/*
    * Get 
*/
const getWeight = async (filter, projection, limit) => {
    const query = UserWeight.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

/*
    * Update
*/
const updateWeight = async (condition, update, options) => {
    return await UserWeight.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteWeight = async (conditions) => {
    return await UserWeight.deleteOne(conditions);
}

export { addWeight, getWeight, updateWeight, deleteWeight };