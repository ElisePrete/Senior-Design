import './GetStarted.css'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestion,loadQuestions } from '../../model/actions';
import {Table, Container, Row, Col} from "react-bootstrap"
/**Eventually‚ this will be the getting started box.
 * Currently‚ it just presents 10 q's from the db.
 * this lets us know that the db is up and running.
 */
function GetStarted() {
    const dispatch = useDispatch();
    var {objs} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadQuestions())
    }, [])
    console.log("objs in getSTarted:", objs)
    return (
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
                                        <td>{item.question}</td>
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
