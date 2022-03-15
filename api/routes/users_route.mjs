import express, { application } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../auth/auth.mjs';
import * as users from '../models/user_model.mjs';
import * as profiles from '../models/user_profile_model.mjs';
import * as weights from '../models/weight_model.mjs';
import * as heights from '../models/height_model.mjs';
const router = express.Router();

/*******************
    * Middleware
*******************/

/*
    * Token validation middleware
    * Validate that the user requesting an operation is authenticated
*/
// router.use('/', (req, res, next) => {
//     req = verifyToken(req, res, next);
//     next();
// });

router.use(verifyToken)

/*********************************************
    * HELPER FUNCTIONS FOR DEVELOPMENT ONLY
*********************************************/

router.get('/', async (req, res) => {
    users.getUser({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `{error}`});
        });
});

router.get('/me', (req, res) => {
    const filter = {email: req.user.email}
    users.getUser(filter)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

// Update user profile (weight, height)
router.get('/profile', async (req, res) => {
    
    try {
        const filter = {_id: req.user.profile_id};

        // get user profile to get correct height, weight ids
        const profile = await profiles.getUserProfile(filter);
        const pProfile = JSON.parse(JSON.stringify(profile))[0];

        const weight = await weights.getWeight({ _id: pProfile.weight_lbs });
        const pWeight = JSON.parse(JSON.stringify(weight))[0];

        const height = await heights.getHeight({ _id: pProfile.height_in });
        const pHeight = JSON.parse(JSON.stringify(height))[0];

        const userProfile = {weight: pWeight, height: pHeight};

        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({Error: `${error}`});
    }
    

    // get height
    
    // get weight
    
    // create new object with all VALUES



    profiles.getUserProfile(filter)
        .then(profile => {
            const val = JSON.parse(JSON.stringify(profile))[0];
            res.status(200).json(profile);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        })
});

// Update user profile (weight, height)
router.put('/profile', async (req, res) => {
    const filter = {_id: req.user.profile_id};
    const updates = {};
    const user = {};

    // create new weight and height objects
    if (req.body.weight_lbs !== undefined) {
        const weight = await weights.addWeight(req.user.profile_id, req.body.weight_lbs);
        user.weight_lbs = weight._id;
    }
    if (req.body.height_in !== undefined) {
        const height = await heights.addHeight(req.user.profile_id, req.body.height_in);
        user.height_in = height._id;
    }
    
    // update user profile with new weight and height
    const updatedUser = await profiles.updateUserProfile(filter, user, {new: true});
    profiles.updateUserProfile(filter, updates, {new: true})
        .then(profile => {
            res.status(201).json(profile);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        })
});

router.delete('/:id', async (req, res) => {
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