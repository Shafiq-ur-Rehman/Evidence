import { SET_USER_TYPE, CLEAR_USER_TYPE } from "../ActionTypes";

export const UserReducer = (state, action) => {
    switch (action.type) {
        case SET_USER_TYPE:
            let newState = { ...state }
            newState = action.payload
            return newState;

        case CLEAR_USER_TYPE:
            return userType = null;
        default:
            return state;
    }
}