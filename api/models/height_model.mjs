import { UserHeight } from "../data/app.data.mjs";

/*
    * Add
*/
const addHeight = async (user, height_in) => {
    const date = new Date();
    const day = date.getUTCDay();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const fullDate = `${month}-${day}-${year}`;
    const height = new UserHeight({user, height_in, date: fullDate});
    return height.save();
}

/*
    * Get 
*/
const getHeight = async (filter, projection, limit) => {
    const query = UserHeight.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

/*
    * Update
*/
const updateHeight = async (condition, update, options) => {
    return await UserHeight.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteHeight = async (conditions) => {
    return await UserHeight.deleteOne(conditions);
}

export { addHeight, getHeight, updateHeight, deleteHeight };