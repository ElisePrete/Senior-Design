import * as types from "./actionTypes"
import axios from "axios";

const API = "http://localhost:5000"
//talk to model through functions on this page
const getDocs = (docs) => ({
    type: types.GET_DOCS,
    payload:docs
});

export const loadDocs = () => {
    return function(dispatch) {
        axios.get(`${API}/docs`)
        .then((resp) => dispatch(getDocs(resp.data)))
        .catch((err) => console.log("error:", err))
    }
}