import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewTaskForm from '../components/NewTaskForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataService from '../services/dataService';

import { collection, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
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

    const [refresh, setRefresh] = useState(false);

    const [userTasks, setUserTasks] = useState([]);
    const [displayUserTasks, setDisplayUserTasks] = useState([]);

    const [newTaskFormData, setTaskFormData] = useState(
        { 
            task_title: '',
            task_description: '',
            task_due_date: '',
            task_status: '',
        }
    ); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskFormData({ ...newTaskFormData, [name]: value });
    };

    const submitForm = (event) => {
        event.preventDefault();

        newTaskFormData.task_due_date = new Date(newTaskFormData.task_due_date).getTime();
        console.log(JSON.stringify(newTaskFormData));

        (DataService.addTask(newTaskFormData)).then((response) => {
            console.log(`task created`);
        });

        handleClose();

        setTaskFormData(
            { 
                task_title: '',
                task_description: '',
                task_due_date: '',
                task_status: '',
            }
        );

        setRefresh(true);

    };

    useEffect(() => {
            
        if (!localStorage.hasOwnProperty('username')) {
            window.location.href = '/';
        }
        
        setRefresh(false);
        getTasks();

    }, [refresh]); 


    const deleteTask = (event) => {
        let taskId = event.target.name;
        console.log(`delete id ${taskId}`);
        let taskLine = document.getElementById(taskId);
        taskLine.remove();
        let taskArr = userTasks;
        (DataService.deleteTask(taskId)).then((response) => {
            console.log(response);
            taskArr.splice(event.target.name);
            setUserTasks(taskArr);
        });
    };

    const getTasks = async () => {
        await (DataService.getUserTasks()).then((response) => {
            console.log(response);
            setUserTasks(response);
            setLoading(false);
        });
    };



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
                            <Col className="col-lg-2" style={{'border':'1px solid black'}}>DUE DATE</Col>
                            <Col className="col-lg-3" style={{'border':'1px solid black'}}>STATUS</Col>
                            <Col className="col-lg-1"></Col>
                        </Row>
                        {userTasks.map(task => (
                            <Row key={task.id} id={task.id}>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.title}</Col>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.description}</Col>
                                <Col className="col-lg-2" style={{'border':'1px solid black'}}>{task.due_date}</Col>
                                <Col className="col-lg-3" style={{'border':'1px solid black'}}>{task.status}</Col>
                                <Col className="col-lg-1" style={{'border':'1px solid black'}}>
                                    <Button name={task.id} onClick={deleteTask}>X</Button>
                                </Col>
                            </Row>
                        ))}
                    </Container>                    
                </Container>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewTaskForm 
                        newTaskFormData={newTaskFormData}
                        handleChange={handleChange}
                        submitForm={submitForm}
                        setTaskFormData={setTaskFormData}
                    />
                </Modal.Body>
            </Modal>
        </>
    );

}

