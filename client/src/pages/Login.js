import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataService from '../services/dataService';
import Alert from 'react-bootstrap/alert';

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

export default function Login() {
    const [username, setUsername] = useState('');
    const [logName, setLogName] = useState('');

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);


    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // if (localStorage.hasOwnProperty('username')) {
        //     window.location.href = 'taskDisplay';
        // }
        
        async function getUserData(username) {
            let userRef = doc(db, 'users', username);

            const docRef = await getDoc(userRef)
                .then((querySnapshot) => {
                    if (querySnapshot.exists()) {
                        console.log(`user ${username} found`);
                        localStorage.setItem("username", username);
                        window.location.href = 'taskDisplay';
                    } else {
                        console.log(`user ${username} not found`);
                        handleShow();
                        setSubmitted(false);
                    }
                })
        }
        if (submitted) {
            getUserData(username);
        }
    }, [submitted]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsername(value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        console.log(`username: ${username}`);

        setSubmitted(true);
    };

    return (
        <Container style={{'backgroundColor':'white', 'border':'1px solid blue'}}>
            {/* <Button>Login</Button>
            <Button>Sign Up</Button> */}

            
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
                {show ? (
                    <Alert>User not found</Alert>
                ) : (
                    <></>
                )}
                <Row>

                </Row>
            </Form>
        </Container>
    )
}

