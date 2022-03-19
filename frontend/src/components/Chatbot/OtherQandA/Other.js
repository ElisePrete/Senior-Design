import { loadQuestion,loadQuestions } from '../../../model/actions';
import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Other.css"
import OtherMore from "./OtherMore.js"
/*React UI component version (js and html) of the Other Q and A popup which appears when a 
user asks a question independent of docs*/
const Other = (params) => {
    //we call axios dispatch here
    var InputQuestion = params['InputQuestion']
    var howMany = params['howManyQs']
    //console.log("Other | hm",params)
    const dispatch = useDispatch();
    var {obj} = useSelector(state => state.data)
    
    useEffect(() => {
        dispatch(loadQuestion({InputQuestion,howMany}));
        //console.log("obj:",obj)
    }, [])
    if (InputQuestion == undefined || howMany == undefined) {
       // console.log("returned empty div")
        return (<tbody></tbody>)
    }
    //preventing first result from resurfacing when new results are shown. only 4 extra results are supported atm
    if (howMany == 4) {
        return OtherMore(obj)
    }
    //mapping requires key index for each entry
    return (<>
            {obj && Object.keys(obj).map((item,i) => (
                <tbody key={i}>
                    <tr>
                        <td><b>{obj[item].question}</b></td>
                        <td>{obj[item].link}</td>
                    </tr>
                </tbody>
        ))}
        
     
    </>)
       
}


export default Other;
