import { loadQuestion,loadQuestions } from '../../../model/actions';
import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
/*React UI component version (js and html) of the Other Q and A popup which appears when a 
user asks a question independent of docs*/
const Other = ({OtherQuestion}) => {
    //we call axios dispatch here
    const dispatch = useDispatch();
    const {obj} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadQuestion(OtherQuestion));
    }, [])
    return (
        <p className="qNa"> {obj.answer}</p>
     )
}

export default Other;
