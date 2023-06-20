import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataService from '../services/dataService';

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

export default function Login() {
    const [username, setUsername] = useState('');

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (localStorage.hasOwnProperty('username')) {
            window.location.href = 'taskDisplay';
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsername(value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        console.log(`username: ${username}`);
        localStorage.setItem("username", username);

        setSubmitted(true);
        window.location.href = '/taskDisplay';
    };

    return (
        <Container style={{'backgroundColor':'white', 'border':'1px solid blue'}}>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Control placeholder="username" type="text" name="username" value={username} onChange={handleChange} style={{'border':'1px solid blue'}} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit" onClick={submitForm}>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

