import * as types from "./actionTypes"

const initialState = {
    docs:[],
    doc: {},
    msg: ""
}
const docReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_DOCS: 
            return {
                ...state,
                docs: action.payload,
            }
        default:
            return state;
    }
}

export default docReducer;