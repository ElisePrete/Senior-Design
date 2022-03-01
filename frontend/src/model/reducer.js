import * as types from "./actionTypes"

const initialState = {
    objs:[],
    obj: [],
    msg: ""
}
const objReducer = (state = initialState, action) => {
   // console.log("redcer.jss")
    switch(action.type) {
        case types.GET_QS: 
            return {
                ...state,
                objs: action.payload,
            }
        case types.GET_SINGLE_Q:
            return{
                ...state,
                obj:action.payload
            }
        default:
            return state;
    }
}

export default objReducer;