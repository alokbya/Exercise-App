import { ExerciseSchedule } from "../data/app.data.mjs";

/*
    * Add
*/
const addSchedule = async (user, name) => {
    const schedule = new ExerciseSchedule({user, name});
    return schedule.save();
}

/*
    * Get 
*/
const getSchedule = async (filter, projection, limit) => {
    const query = ExerciseSchedule.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

/*
    * Update
*/
const updateSchedule = async (condition, update, options) => {
    return await ExerciseSchedule.findOneAndUpdate(condition, update, options);
}

/*
    * Delete by id
*/
const deleteSchedule = async (conditions) => {
    return await ExerciseSchedule.deleteOne(conditions);
}

export { addSchedule, getSchedule, updateSchedule, deleteSchedule };