import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/****************************
    * Database connection
****************************/

const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.owb95.mongodb.net/exercise_db?retryWrites=true&w=majority`;
// identify db to connect
mongoose.connect(
    mongo_uri,
    { useNewUrlParser: true }
);
// connect to db
const db = mongoose.connection;
db.once('open', () => {
    console.log('Successfully connected to Exercises Database using Mongoose!');
});

/****************
    * Schemas
****************/

// Exercise schema
const exerciseSchema = new mongoose.Schema({
    name : {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true},
    session: {type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseSession', required: true}
});

// User is the model of a user
// This is primarily used for authentication and user profile
const userSchema = new mongoose.Schema({
    first_name: {type: String, default: null, required: true},
    last_name: {type: String, default: null, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    token: {type: String}
});

// User weight
const userWeightSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'UserProfile', required: true},
    weight_lbs: {type: Number, required: true},
    date: {type: Date, required: true},
});

// User height
const userHeightSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'UserProfile', required: true},
    height_in: {type: Number, required: true},
    date: {type: Date, required: true},
});

// User profile is an extension of each user
// This includes an exercise schedule, and favorite sessions
const userProfileSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    weight_lbs: {type: mongoose.Schema.Types.ObjectId, ref: 'UserWeight', default: null},
    height_in: {type: mongoose.Schema.Types.ObjectId, ref: 'UserHeight', default: null},
});

// Exercise session consists of exercises
// This allows users to have multiple sessions in a single day (daily doubles, etc.)
const exerciseSessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true},
    name: {type: String, required: true},
});

// Each day is a collection (array) of exercise sessions
// This allows the user to have multiple sessions in a day
const exerciseScheduleSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true},
    monday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
    tuesday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
    wednesday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
    thursday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
    friday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
    saturday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
    sunday: {type: [mongoose.Schema.Types.ObjectId], ref: 'ExerciseSession', required: true, default: null},
});

// Blacklist schema
// This is used to record JWTs which are no longer valid (added after user logs out)
const blacklistSchema = new mongoose.Schema({
    token: {type: String, required: true}
});

// compile, generate models
const UserWeight = mongoose.model("UserWeight", userWeightSchema);
const UserHeight = mongoose.model("UserHeight", userHeightSchema);
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
const ExerciseSchedule = mongoose.model("ExerciseSchedule", exerciseScheduleSchema);
const ExerciseSession = mongoose.model("ExerciseSession", exerciseSessionSchema);
const BlackList = mongoose.model("BlackList", blacklistSchema);
const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);

export { UserWeight, UserHeight, UserProfile, ExerciseSchedule, ExerciseSession, BlackList, User, Exercise }