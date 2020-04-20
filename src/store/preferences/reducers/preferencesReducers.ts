import { USER_SET } from "../../user/types";

const initialState = {firstLogin: true};
export default (state = initialState, action: any) => {
    switch(action.type){
        case USER_SET:
            return {...state, firstLogin: false};
        default:
            return state;
    }
};