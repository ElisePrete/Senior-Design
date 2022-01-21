import * as types from "./actionTypes"
import axios from "axios";
//axios allows a user to make http request through their browser
const API = "http://localhost:5000"
//talk to model through functions on this page


const getObjs = (objs) => (
    {
    type: types.GET_OBJS,
    payload:objs
});


export const loadQuestions = () => {
    return function(dispatch) {
        axios.get(`${API}/api/Questions`)
        .then((resp) =>  dispatch(getObjs(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}
/*
export const loadDocuments = () => {
    return function(dispatch) {
        axios.get(`${API}/api/Documents`)
        .then((resp) =>  dispatch(getObjs(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}


export const loadSummaries = () => {
    return function(dispatch) {
        axios.get(`${API}/api/Summaries`)
        .then((resp) =>  dispatch(getObjs(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}*/

//NOTE: above functions were used for demo (recyclable)
