import * as types from "./actionTypes"

const initialState = {
    objs:[],
    obj: [],
    docs:[],
    doc:{},
    msg: ""
}
const objReducer = (state = initialState, action) => {
   // console.log("redcer.jss")
    switch(action.type) {
        case types.GET_QS: 
            console.log("in action:", action.payload.length)
            return {
                ...state,
                objs: action.payload,
            }
        case types.GET_SINGLE_Q:
            return{
                ...state,
                obj:action.payload
            }
        case types.GET_DOCS:
            return{
                ...state,
                docs:action.payload
            }
        case types.GET_SINGLE_DOC:
        return{
            ...state,
            doc:action.payload
        }
        default:
            return state;
    }
}

export default objReducer;