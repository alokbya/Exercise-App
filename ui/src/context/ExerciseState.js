import React, { createContext, useReducer } from 'react';
import ExerciseReducer from './ExerciseReducer';

const initialState = {
    exercises: [],
};

export const ExerciseContext = createContext(initialState);

export const ExerciseProvider = ({ children })=> {
    const [ state, dispatch ] = useReducer(ExerciseReducer, initialState);

    return (
        <ExerciseContext.Provider value={{
            
        }}>
        </ExerciseContext.Provider>
    );
}