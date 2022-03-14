// import mongoose from 'mongoose';

// // identify db to connect
// mongoose.connect(
//     'mongodb://localhost:27017/exercises_db',
//     { useNewUrlParser: true }
// );

// // connect to db
// const db = mongoose.connection;

// db.once('open', () => {
//     console.log('Successfully connected to MongoDB using Mongoose!');
// });

// // define schema
// const exerciseSchema = new mongoose.Schema({
//     name : {type: String, required: true},
//     reps: {type: Number, required: true},
//     weight: {type: Number, required: true},
//     unit: {type: String, required: true},
//     date: {type: String, required: true}
// });

// // compile, generate model
// const Exercise = mongoose.model("Exercise", exerciseSchema);

// // methods

// /*
//     * Add
// */
// const addExercise = async (name, reps, weight, unit, date) => {
//     const exercise = new Exercise({name, reps, weight, unit, date});
//     return exercise.save();
// }

// /*
//     * Get 
// */
// const getExercise = async (filter, projection, limit) => {
//     const query = Exercise.find();

//     // Search query - ANDED parameters
//     if(Object.keys(filter).length > 0) {
//         query.and(filter);
//     }

//     // Execute query
//     return query.exec();
// }

// /*
//     * Update
// */
// const updateExercise = async (condition, update, options) => {
//     return await Exercise.findOneAndUpdate(condition, update, options);
// }

// /*
//     * Delete by id
// */
// const deleteExerciseById = async (conditions) => {
//     return await Exercise.deleteOne(conditions);
// }

// /*
//     * Delete
// */
// const deleteExercise = async (conditions) => {
//     return await Exercise.deleteMany(conditions);
// }

// // Export module functions
// export { addExercise, getExercise, updateExercise, deleteExerciseById, deleteExercise };