import React, { createContext, useReducer } from "react";
import ProfileReducer from './ProfileReducer';

// Initial State
const initialState = {};

// Create context
export const ProfileContext = createContext(initialState);

// Provider component
// This is a wrapper for other components to allow them to access the context state
export const ProfileProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(ProfileReducer, initialState);

        const updateUserWeight = (newUserWeightLbs) => {
            dispatch({
                type: 'UPDATE_USER_WEIGHT_LBS',
                payload: {
                    weight_lbs: newUserWeightLbs,
                },
            });
        }

        const updateUserHeight = (newUserHeightIn) => {
            dispatch({
                type: 'UPDATE_USER_HEIGHT_IN',
                payload: {
                    height_in: newUserHeightIn,
                },
            });
        }

        const updateUserFirstName = (newFirstName) => {
            dispatch({
                type: 'UPDATE_USER_FIRST_NAME',
                payload: {
                    first_name: newFirstName,
                },
            });
        }

        const updateUserLastName = (newLastName) => {
            dispatch({
                type: 'UPDATE_USER_LAST_NAME',
                payload: {
                    last_name: newLastName,
                },
            });
        }

        const updateUserEmail = (newEmail) => {
            dispatch({
                type: 'UPDATE_USER_EMAIL',
                payload: {
                    email: newEmail,
                },
            });
        }

    return (
        <ProfileContext.Provider value={{
            profile: state,
            updateUserWeight,
            updateUserHeight,
            updateUserFirstName,
            updateUserLastName,
            updateUserEmail,
        }}>
            {children}
        </ProfileContext.Provider>
    );
}