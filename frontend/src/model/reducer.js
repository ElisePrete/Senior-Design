import * as types from "./actionTypes"

const initialState = {
    objs:[],
    obj: {},
    msg: ""
}
const objReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_OBJS: 
            return {
                ...state,
                objs: action.payload,
            }
        default:
            return state;
    }
}

export default objReducer;