import { Exercise } from "../data/app.data.mjs";

/*
    * Add
*/
const addExercise = async (name, reps, weight, unit, date, user, session) => {
    const exercise = new Exercise({name, reps, weight, unit, date, user, session});
    return exercise.save();
}

/*
    * Get 
*/
const getExercise = async (filter, projection, limit) => {
    const query = Exercise.find();

    // Search query - ANDED parameters
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }

    // Execute query
    return query.exec();
}

/*
    * Get by session id
*/
const getExerciseBySessionId = async (sessionId) => {
    const query = Exercise.find();
    query.and({session: sessionId});
    query.exec();
}

/*
    * Update
*/
const updateExercise = async (condition, update, options) => {
    return await Exercise.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteExerciseById = async (conditions) => {
    return await Exercise.deleteOne(conditions);
}

/*
    * Delete
*/
const deleteExercise = async (conditions) => {
    return await Exercise.deleteMany(conditions);
}

// Export module functions
export { addExercise, getExercise, getExerciseBySessionId, updateExercise, deleteExerciseById, deleteExercise };