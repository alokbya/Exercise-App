import express from 'express';
import { verifyToken } from '../auth/auth.mjs';
import * as sessions from '../models/exercise_session_model.mjs'

const router = express.Router();

/******************
    * Endpoints
******************/

