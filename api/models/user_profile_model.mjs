import { UserProfile } from "../data/app.data.mjs";

/*
    * Add
*/
const addUserProfile = async (user) => {
    const session = new UserProfile({user});
    return session.save();
}

/*
    * Get 
*/
const getUserProfile = async (filter) => {
    const query = UserProfile.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

/*
    * Update
*/
const updateUserProfile = async (condition, update, options) => {
    return await UserProfile.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteUserProfile = async (conditions) => {
    return await UserProfile.deleteOne(conditions);
}

export { addUserProfile, getUserProfile, updateUserProfile, deleteUserProfile };