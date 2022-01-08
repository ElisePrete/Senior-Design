import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadDocs } from './redux/actions';
import {Navbar, Table, Container, Row, Col, Button, ButtonGroup, Form} from "react-bootstrap"
function Crud() {
    const dispatch = useDispatch();
    const {docs} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadDocs());
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
                                <th>Keyword</th>
                                <th>Text</th>
                            </tr>
                            </thead>
                            {docs && docs.map((item,index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.keyword}</td>
                                        <td>{item.text}</td>
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
