import { loadQuestion,loadQuestions } from '../../../model/actions';
import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import "./Other.css"
import OtherMore from './OtherMore';
/*React Widget which shows document-independent Results. Currently wonky:
- 'More results' widget changes all previous result components
- 'More results' also display original first result
import OtherMore from "./OtherMore.js" <- OtherMore component fixes the latter but not the former. removed atm */
const Other = (params) => {
    var InputQuestion = params['InputQuestion']
    var howMany = params['howManyQs']
    const dispatch = useDispatch();
    var {obj} = useSelector(state => state.data)
    var toFrom = [0,1]
    useEffect(() => {
        dispatch(loadQuestion({InputQuestion,howMany}));
        //console.log("obj:",obj)
    }, [])
    if (InputQuestion == undefined || howMany == undefined) {
       // console.log("returned empty div")
        return (<tbody>No results found, please rephrase</tbody>)
    }
    //preventing many result from resurfacing when new results are shown. only 4 extra results are supported atm
    if (howMany == 4) {
        toFrom = [1, undefined]
    }
    return NoReRender(obj, toFrom)  
}


export default Other;

const NoReRender = (arr,toFrom) => {
    console.log("nrr:", toFrom)
    return (<>{arr && Object.keys(arr).slice(toFrom[0], toFrom[1]).map((item,i) => (
        <tbody key={i} className="link">
            <a className='qNa' href={arr[item].link}><b className='question'> {arr[item].question}</b></a><br/>
        </tbody>
    ))} </>)
}