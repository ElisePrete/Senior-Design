import * as types from "./actionTypes"
import axios from "axios";
//axios allows a user to make http request through their browser
var API = window.location.host //"http://127.0.0.1:5000"
//talk to model through functions on this page

//for local or remote differentiation
//console.log("API:",API)
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

const getDocuments = (docs) => (
    {
    type: types.GET_DOCS,
    payload:docs
});

const getDocument = (doc) => (
    {
    type: types.GET_SINGLE_DOC,
    payload:doc
});


export const loadQuestions = () => {
    return function(dispatch) {
        axios.get(`${API}/api/Questions`)
        .then((resp) =>  dispatch(getQuestions(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}
export const loadQuestion = ({InputQuestion,howMany}) => {
    //InputQuestion = params['InputQuestion']
    //howMany = params['howMany']
    //,"how many:", InputQuestion[0['howMany']
    //console.log("in loadquestion:", InputQuestion,"how many",howMany)
    return function(dispatch) {
        axios.get(`${API}/api/Question`, { params:{
            input:InputQuestion,
            many:howMany}
        })
        .then((resp) =>  dispatch(getQuestion(resp.data)) )
        .catch((err) => console.log("load question error:", err))
     }
}

export const loadDocuments = ({InputQuestion}) => {
    //console.log("actionjs:",InputQuestion)
    return function(dispatch) {
        axios.get(`${API}/api/Documents`, { params:{
            input:InputQuestion}
        })
        .then((resp) =>  dispatch(getDocuments(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}

export const loadDocument = ({docID}) => {
    return function(dispatch) {
        axios.get(`${API}/api/Document`, { params:{
            input:docID}
        })
        .then((resp) =>  dispatch(getDocument(resp.data)) )
        .catch((err) => console.log("error:", err))
     }
}