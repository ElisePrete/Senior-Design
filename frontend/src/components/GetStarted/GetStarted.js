import './Welcome.css'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestion,loadQuestions } from '../../model/actions';
import {Table, Container, Row, Col} from "react-bootstrap"

/**Eventually‚ this will be the getting started box.
 * Currently‚ it just presents 10 q's from the db.
 * this lets us know that the db is up and running.
 */
function GetStarted() {
   /* const dispatch = useDispatch();
    var {objs} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadQuestions())
    }, [])
    console.log("objs in getSTarted:", objs)
    */
    return (
        <div className='welcome'>
            Welcome to <b>D.Find</b>: a premier tool for discovering relevant claims files and their summaries, in addition to answering typical questions concerning the disability claims process. To begin, click or type responses to our Chatbot, or select an example question below.

        </div>
       /*/Some example questions include- <i>How do I file a disability claim online?</i>, <i>What does 'Remanded' mean?</i>, and <i>Where can I find a lawyer?</i>

        <><Container className='getStarted'>
                <Row>
                    <Col nd={8}>
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <th>Example Questions:</th>
                            </tr>
                            </thead>
                            {objs && objs.map((item,index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td><button onClick={callChatbot}>{item.question}</button></td>
                                    </tr>
                                    </tbody>
                            ))}
                        </Table>
                    </Col>

                </Row>
            </Container>
        </>*/

    )
}

export default GetStarted
