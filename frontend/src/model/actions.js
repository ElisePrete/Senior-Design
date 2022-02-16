import * as types from "./actionTypes"
import axios from "axios";
//axios allows a user to make http request through their browser
var API = window.location.host //"http://127.0.0.1:5000"
//talk to model through functions on this page

//for local or remote differentiation
console.log("API:",API)
if (API == 'localhost:3000') {
    API = 'http://127.0.0.1:5000'
}
else {
    API = ''
}

/*
*** to connect a new api call: ***
--make a unique action type in actionTypes
--make a sister function utilizing that actionType here
--develop a case for that actionType in reducer */

const getQuestions = (objs) => (
    {
    type: types.GET_QS,
    payload:objs
});

const getQuestion = (objs) => (
    {
    type: types.GET_SINGLE_Q,
    payload:objs
});

export const loadQuestions = () => {
    return function(dispatch) {
        axios.get(`${API}/api/Questions`)
        .then((resp) =>  dispatch(getQuestions(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}
export const loadQuestion = (question) => {
    console.log("in loadquestion:", question)
    return function(dispatch) {
        axios.get(`${API}/api/Question`, {params:{input:question}})
        .then((resp) =>  dispatch(getQuestion(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}