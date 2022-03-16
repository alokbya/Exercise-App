export default (state, action) => {
    switch(action.type) {
        case 'UPDATE_USER_WEIGHT_LBS':
            return {...state, weight_lbs: action.payload.weight_lbs};
        case 'UPDATE_USER_HEIGHT_IN':
            return {...state, height_in: action.payload.height_in};
        case 'UPDATE_USER_FIRST_NAME':
            return {...state, first_name: action.payload.first_name};
        case 'UPDATE_USER_LAST_NAME':
            return {...state, last_name: action.payload.last_name};
        case 'UPDATE_USER_EMAIL':
            return {...state, email: action.payload.email};
        default:
            return state;
    }
}