import { ExerciseSession } from '../data/app.data.mjs';

/*
    * Add
*/
const addSession = async (user, name) => {
    const session = new ExerciseSession({user, name});
    return session.save();
}

/*
    * Get 
*/
const getSession = async (filter, projection, limit) => {
    const query = ExerciseSession.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

/*
    * Update
*/
const updateSession = async (condition, update, options) => {
    return await ExerciseSession.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteSession = async (conditions) => {
    return await ExerciseSession.deleteOne(conditions);
}

export { addSession, getSession, updateSession, deleteSession };