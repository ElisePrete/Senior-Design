import './GetStarted.css'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestion,loadQuestions } from '../../../model/actions';
import {Table, Container, Row, Col} from "react-bootstrap"
/*///Everything below is to make it draggable? Might do that -> https://www.npmjs.com/package/react-draggable
// ES6
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

// CommonJS
let Draggable = require('react-draggable');
let DraggableCore = Draggable.DraggableCore;*/

 const objs = ["Cases concerning the respiratory system.",
 "What is the easiest way to file a claim?",
 "Remanded docs about raised blood pressure",
 "How do I appeal a denied disability claim?",
 "Claims about Post-traumatic Stress Disorder and Depression.",
 "How Do Disability Ratings Work for Veterans Benefits?",
 "Remanded claims about brain damage."]

const hello = (item) => { //test function. ignore
    console.log(item)
}

const GetStarted = (props) => {
    var active = props.DocumentSearch;
    
    const dispatch = useDispatch();
    var {docs} = useSelector(state => state.data)
    if (docs.length > 0) {
        active = true
    }
    console.log("is it true!?:", active)
    /*const dispatch = useDispatch();
    //var objs;
    useEffect(() => {
        dispatch(loadQuestions())
    }, [])
    console.log("objs in getSTarted:", objs)
    */
    return (
        <><Container className={`${(active == true) ? "invisible": "getStarted"}`}>
                <Row>
                    <Col nd={8}>
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <th className='title'>Example Questions:</th>
                            </tr>
                            </thead>
                            {objs.map((item,index) => (
                                <tbody >
                                    <tr>
                                        <td><button className="gsButton" onClick={() => props.actionProvider.handleExampleQ(item,index)}>{item}</button></td>
                                    </tr>
                                    </tbody>
                            ))}
                        </Table>
                    </Col>

                </Row>
            </Container>
        </>

    )
}



export default GetStarted
