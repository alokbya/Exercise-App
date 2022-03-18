import { ExerciseContext } from "./ExerciseState";

export default (state, action) => {
    switch (action.type) {
        case 'ADD_EXERCISE':
            // const a = ''
            // return {

            // }
        case 'DELETE_EXERCISE':
            // const b =state.exercises.filter(exercise => exercise._id !== action.payload.id),
            // return {
            //     ...state,
            //     exercises: state.exercises.filter(exercise => exercise._id !== action.payload.id),
            // };
        case 'UPDATE_EXERCISE':

        case 'REPLACE_EXERCISES':
            // action.payload.exercises = [{e1}, {e2}, {e3}, ...]
            const a = {
                ...state,
                exercises: action.payload.exercises,
            };
            return {
                ...state,
                exercises: action.payload.exercises
            };
        default:
            return state;
    }
}