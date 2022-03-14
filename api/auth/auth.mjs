import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import * as blackList from '../models/blacklist_model.mjs';

dotenv.config();

/*
    * Verify Token (JWT)
    * This middleware is executed before certain operations which require user authentication
    * The blacklist is checked to determine if users jwt has been added
    * If so, the api will not carryout the operations asked of it
    * Client will receive a HTTP 403 error if their JWT is blacklisted
    * 
*/
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({Error: 'A token is required for authentication'});
    }
    try {
        const matchingToken = await blackList.getToken({ token });
        if (matchingToken.length > 0) {
            return res.status(403).json({Error: 'A token is required for authentication'}); 
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        console.error(error);
        res.status(500).json({Error: `${error}`});
    }
    return next();
}

/*
    * Destroy Token (JWT)
    * This middleware adds the token to a blacklist stored in mongo
    * This list will be checked before certain operations are executed to determine if user is authenticated
    * await keyword is used to halt additional processing before jwt is added to black list
    * Race condition was found when await keyword was not in place
*/

const destroyToken = async (req, res, next) => {
    const userToken = req.cookies.token;
    await blackList.addToken(userToken)
        .then(addedToken => {
            console.log(`Blacklisted token: ${addedToken}`);
        })
        .catch(error => {
            res.status(500).json({Error: `${error}`});
        });
    return next();
}

export { verifyToken, destroyToken };