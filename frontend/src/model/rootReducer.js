import {combineReducers} from "redux";
import objReducer from "./reducer"

const rootReducer = combineReducers( {
    data: objReducer
});

export default rootReducer;

//console.log("rootReducer | rootReducer: %s ",rootReducer);