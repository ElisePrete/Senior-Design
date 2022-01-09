import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestions } from './model/actions';
import {Navbar, Table, Container, Row, Col, Button, ButtonGroup, Form} from "react-bootstrap"
function Crud() {
    const dispatch = useDispatch();
    const {objs} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadQuestions());
    }, [])
    return (
        <><Navbar bg="primary" variant="light" className="justify-content-center">
            <h1 style={{ color: "white" }}> D.Find </h1>
        </Navbar><Container>
                <Row>
                    <Col nd={8}>
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Answer</th>
                            </tr>
                            </thead>
                            {objs && objs.map((item,index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.question}</td>
                                        <td>{item.answer}</td>
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

export default Crud
