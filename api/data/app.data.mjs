import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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

// define schema
const exerciseSchema = new mongoose.Schema({
    name : {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}   // need to find a diff data type for this, string probably isn't best
});

const userSchema = new mongoose.Schema({
    first_name: {type: String, default: null, required: true},
    last_name: {type: String, default: null, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    token: {type: String}
});

const blacklistSchema = new mongoose.Schema({
    token: {type: String, required: true}
});

const BlackList = mongoose.model("BlackList", blacklistSchema);

const User = mongoose.model("User", userSchema);

// compile, generate model
// const Exercise = conn.model("Exercise", exerciseSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
// methods

export { Exercise, User, BlackList }