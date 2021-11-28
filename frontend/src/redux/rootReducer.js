import {combineReducers} from "redux";
import docReducer from "./reducer"

const rootReducer = combineReducers( {
    data: docReducer
});

export default rootReducer;