import { application } from 'express';
import * as users from '../models/user_model.mjs';
import * as blackList from '../models/blacklist_model.mjs';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { destroyToken } from '../auth/auth.mjs';

dotenv.config();

const router = express.Router();

/*
    * Register user
        * Get user input
        * Validate user input
        * Validate if user exists
        * Encrypt user password
        * Create a user in database
        * Create signed JWT token
*/
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).json({Error: 'All inputs are required'});
        }

        // Validate if user exists
        const old_user = await users.getUser({ email });
        if (old_user.length !== 0) {
            return res.status(409).json({Error: 'User already exists'});
        }

        // Encrypt user password
        const encrypted_password = await bcrypt.hash(password, 10);

        // Create new user
        const user = await users.createUser(first_name, last_name, email, encrypted_password);
        
        // Create signed token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h',
            },
        );

        user.token = token;

        // Set token cookie (JWT)
        res.cookie('token', token).status(201).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({Error: `${error}`});
    }
});

/*
    * Login user
    * Get user input
    * Validate user input
    * Validate user exists
    * Verify user password against stored password
    * Create a signed JWT token
*/
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).json({Error: 'All inputs are required'});
        }

        // Validate user exists
        const user = await users.getUser({ email });
        if (user.length === 0) {
            res.status(400).json({Error: 'Invalid username or password'});
        }
        const pUser = JSON.parse(JSON.stringify(user))[0];
        if (user && (await bcrypt.compare(password, pUser.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: pUser._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                },
            );

            // Save user token
            user.token = token;

            // Set token cookie (JWT)
            res.cookie('token', token).status(200).json(user);
        }
        res.status(400).json({Error: 'Invalid username or password'});
    } catch(error) {
        console.error(error);
        res.status(500).json({Error: `${error}`});
    }
});

/*
    * Logout user
    * Middleware (destroyToken) will add users JWT (req.cookies.token) to black list
    * The JWT will be fetched from the blacklist
    * If JWT is found, the token cookie is cleared, and HTTP 200 is returned to client
    * If JWT is not found HTTP 404 (Not Found) is returned to client
*/
router.delete('/logout', destroyToken, (req, res) => {
    const filter = { token: req.cookies.token};
    blackList.getToken(filter)
        .then(token => {
            if (token.length > 0) {
                res.clearCookie('token');
                res.status(200).json({Status: 'JWT token blacklisted'});
            } else {
                res.status(404).json({Status: 'JWT not found in blacklist'});
            }
        })
        .catch(error => {
            res.status(500).json({Status: 'Unable to blacklist token'});
        });
});

/*********************************************
    * HELPER FUNCTIONS FOR DEVELOPMENT ONLY
*********************************************/

router.get('/users', async (req, res) => {
    users.getUser({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `{error}`});
        });
});

router.delete('/users/:id', async (req, res) => {
    users.deleteUser({_id: req.params.id})
        .then(user => {
            if (user.deletedCount > 0) {
                res.status(204).json({Status: `Deleted user: ${req.params.id}`});
            } else {
                res.status(404).json({Error: "Document not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        })
});

export { router };