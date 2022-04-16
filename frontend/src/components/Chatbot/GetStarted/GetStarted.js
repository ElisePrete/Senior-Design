import './GetStarted.css'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestion,loadQuestions } from '../../../model/actions';
import {Table, Container, Row, Col} from "react-bootstrap"

/**Eventually‚ this will be the getting started box.
 * Currently‚ it just presents 10 q's from the db.
 * this lets us know that the db is up and running.
 */

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
    const active = props.DocumentSearch;
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
                                <th>Example Questions:</th>
                            </tr>
                            </thead>
                            {objs.map((item,index) => (
                                <tbody >
                                    <tr>
                                        <td><button onClick={() => props.actionProvider.handleExampleQ(item,index)}>{item}</button></td>
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
