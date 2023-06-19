import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewTaskForm from '../components/NewTaskForm';

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

export default function TaskDisplay() {
    let user = localStorage.getItem("username");
    const [currUser, setCurrUser] = useState(user);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [userExists, setUserExists] = useState(null);

    useEffect(() => {
        async function getUserData(username) {
            let docRef = doc(db, 'users', username);

            await getDoc(docRef)
                .then((querySnapshot) => {
                    if (querySnapshot.exists()) {
                        setUserExists(true);
                        console.log(`user data: ${JSON.stringify(querySnapshot.data())}`);
                        setUserData(querySnapshot.data());
                        setLoading(false);
                    } else {
                        setUserExists(false);
                        console.log(`user with name ${username} could not be found`);
                    }
                })
        }

        getUserData(currUser);
    }, []);

    return (
        <>
            <Container>
                <p>User Data: {JSON.stringify(userData)}</p>
                <Button onClick={handleShow}>+</Button>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewTaskForm />
                </Modal.Body>
            </Modal>
        </>
    );

}