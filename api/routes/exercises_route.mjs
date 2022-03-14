import express, { application } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../auth/auth.mjs';
import * as exercises from '../models/exercise_model.mjs';
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

/******************
    * Endpoints
******************/

/*
    * Only the addition of an exercise, and reading **all** exercises use this token.
    * When updating, or deleting an exercise, the exercise ID is used.
    * The exercise ID is tied to the user, so these processes don't require user authentication (at this point it's been done already)
*/

/*
    * Create
    * This endpoint will use a cookie (token) to determine which user is associated with this exercise.
*/
router.post("/", async (req, res) => {
    
    await exercises.addExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit === "kg" ? "kg" : "lbs",
        req.body.date,
        req.user.user_id)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

/*
    * Read all
    * This endpoint will use a cookie (token) to determine which user is associated with this exercise.
*/
router.get("/", async (req, res) => {
    const filter = {};
    filter.user = req.user.user_id;
    await exercises.getExercise(filter, '', 0)
        .then(exercise => {
            if(exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({Error : `Document not found: ${error}`})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

/*
    * Read by id
*/
// router.get("/:id", async (req, res) => {
//     const filter = {_id: req.params.id};
//     await exercises.getExercise(filter, '', 0)
//         .then(exercise => {
//             if(exercise !== null && exercise.length > 0) {
//                 res.status(200).json(exercise);
//             } else {
//                 res.status(404).json({Error : "Document not found"})
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({Error: `${error}`});
//         });
// });

/*
    * Update by id
*/
router.put("/:id", async (req, res) => {
    // update by id
    await exercises.updateExercise({_id: req.params.id}, req.body, {new: true})
        .then(exercise => {
            if(exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({Error: "Document not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        })

});

/*
    * Delete by id
*/
router.delete("/:id", async (req, res) => {
    await exercises.deleteExerciseById({_id: req.params.id})
        .then(exercise => {
            if(exercise.deletedCount > 0) {
                res.status(204).json(exercise);
            } else {
                res.status(404).json({Error: "Document not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `${error}`});
        });
});

export { router };