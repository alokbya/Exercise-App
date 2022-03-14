import { router as exercises_route } from './routes/exercises_route.mjs'
import { router as auth_route } from './routes/auth_route.mjs';
import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = 3000;

// MIDDLEWARE

/*
    * Enable cookies
*/
app.use(cookieParser());

/*
    * Set response content type
*/
app.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

/*
    * Parse requests into JSON
*/
app.use(express.json()) 

app.use('/auth', auth_route);
app.use('/exercises', exercises_route);
// Validate session id for authentication


// CONTROLLER



/*
    * Listen for incoming requests on PORT
*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});