import { loadQuestion,loadQuestions } from '../../../model/actions';
import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import "./Other.css"

/*React Widget which shows document-independent Results. Currently wonky:
- 'More results' widget changes all previous result components
- 'More results' also display original first result
import OtherMore from "./OtherMore.js" <- OtherMore component fixes the latter but not the former. removed atm */
const Other = (params) => {
    var InputQuestion = params['InputQuestion']
    var howMany = params['howManyQs']

    const dispatch = useDispatch();
    var {obj} = useSelector(state => state.data)
    
    useEffect(() => {
        dispatch(loadQuestion({InputQuestion,howMany}));
        //console.log("obj:",obj)
    }, [])
    if (InputQuestion == undefined || howMany == undefined) {
       // console.log("returned empty div")
        return (<tbody>No results found, please rephrase</tbody>)
    }
    //preventing first result from resurfacing when new results are shown. only 4 extra results are supported atm
   /* if (howMany == 4) {
        return OtherMore(obj)
    }*/
    return (
        <>{obj && Object.keys(obj).map((item,i) => (
            <tbody key={i} className="link">
                <a href={obj[item].link}><b>{obj[item].question}</b></a><br/>
            </tbody>
        ))} </>
    )  
}


export default Other;
