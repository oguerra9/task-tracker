import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewTaskForm from '../components/NewTaskForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        async function getUserData(username) {
            if (!localStorage.hasOwnProperty('username')) {
                window.location.href = '/';
            }

            let docRef = doc(db, 'users', username);
            let tasksRef = collection(db, 'users', username, 'tasks');
            let taskArr = [];

            // await getDoc(docRef)
            //     .then((querySnapshot) => {
            //         if (querySnapshot.exists()) {
            //             setUserExists(true);
            //             console.log(`user data: ${JSON.stringify(querySnapshot.data())}`);
            //             setUserData(querySnapshot.data());
            //             setLoading(false);
            //         } else {
            //             setUserExists(false);

            //             console.log(`user with name ${username} could not be found`);
            //         }
            //     })
            // }

            await getDocs(tasksRef) 
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        taskArr.push(doc.data());
                    });
                    setUserTasks(taskArr);
                    setLoading(false);
                })
            
        }
            
            
            getUserData(currUser);
            console.log(userTasks);
    }, []);

    return (
        <>
            {loading ? (
                <Container>
                    Loading...
                </Container>
            ) : (
                <Container>
                    <Container>
                        <Row>
                            <Col>
                                <h1>{user}'s Tasks</h1>
                            </Col>
                            <Col>
                                <Button onClick={handleShow}>+</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col className="col-lg-3" style={{'border':'1px solid black'}}>TITLE</Col>
                            <Col className="col-lg-3" style={{'border':'1px solid black'}}>DESCRIPTION</Col>
                            <Col className="col-lg-3" style={{'border':'1px solid black'}}>DUE DATE</Col>
                            <Col className="col-lg-3" style={{'border':'1px solid black'}}>STATUS</Col>
                        </Row>
                        {userTasks.map(task => (
                            <Row key={task.id}>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.title}</Col>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.description}</Col>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.due_date}</Col>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.status}</Col>
                            </Row>
                        ))}
                    </Container>
                    
                    <p>User Data: {JSON.stringify(userData)}</p>
                    
                </Container>
            )}

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

// async function retrieveTasks(taskIds) {
//     let taskArr = [];

//     taskIds.forEach((taskId) => {
//         let taskObj = await getDoc(doc(db, "tasks", taskId))
//     })
// }