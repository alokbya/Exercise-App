import React, { createContext, useReducer } from 'react';
import ExerciseReducer from './ExerciseReducer';

// Initial state is an array containing a single empty object
const initialState = {
    exercises: [{}],
};

export const ExerciseContext = createContext(initialState);

export const ExerciseProvider = ({ children })=> {
    const [ state, dispatch ] = useReducer(ExerciseReducer, initialState);

    const addExercise = (e) => {
        dispatch({
            type: 'ADD_EXERCISE',
            payload: {
                exercise: e,
            },
        });
    };

    const deleteExercise = (e) => {
        dispatch({
            type: 'DELETE_EXERCISE',
            payload: {
                exercise: e,
            },
        });
    };

    const updateExercise = (e) => {
        dispatch({
            type: 'UPDATE_EXERCISE',
            payload: {
                exercise: e,
            },
        });
    };

    const replaceExercises = (newExercises) => {
        dispatch({
            type: 'REPLACE_EXERCISES',
            payload: {
                exercises: newExercises,
            },
        });
    };

    return (
        <ExerciseContext.Provider value={{
            exercises: state.exercises,
            // addExercise,
            // deleteExercise,
            // updateExercise,
            replaceExercises,
        }}>
            { children }
        </ExerciseContext.Provider>
    );
}