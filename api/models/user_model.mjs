import { User } from "../data/app.data.mjs";

/*
    * Add
*/
const createUser = async (first_name, last_name, email, password) => {
    const user = new User({first_name, last_name, email, password});
    return user.save();
}

/*
    * Get 
*/
const getUser = async (filter, projection, limit) => {
    const query = User.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

/*
    * Update
*/
const updateUser = async (condition, update, options) => {
    return await User.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteUser = async (conditions) => {
    return await User.deleteOne(conditions);
}

export { createUser, getUser, updateUser, deleteUser };