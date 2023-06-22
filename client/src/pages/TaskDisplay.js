import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewTaskForm from '../components/NewTaskForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DataService from '../services/dataService';
import '../style.css';

import { collection, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function TaskDisplay() {
    let user = localStorage.getItem("username");
    //const [currUser, setCurrUser] = useState(user);

    const [formMode, setFormMode] = useState('');

    const [sortMode, setSortMode] = useState('Sort');
    let sortingModes = ['title', 'status', 'due-date'];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    //const [userExists, setUserExists] = useState(null);

    const [refresh, setRefresh] = useState(false);

    const [userTasks, setUserTasks] = useState([]);
    //const [displayUserTasks, setDisplayUserTasks] = useState([]);

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

    const submitAddForm = (event) => {
        event.preventDefault();

        newTaskFormData.task_due_date = new Date(newTaskFormData.task_due_date).getTime();
        console.log(JSON.stringify(newTaskFormData));

        (DataService.addTask(newTaskFormData)).then((response) => {
            console.log(`task created`);
        });

        handleClose();
        clearForm();
        setRefresh(true);

    };

    const submitEditForm = (event) => {
        event.preventDefault();

        console.log('edit submitted');
        console.log(newTaskFormData);

        (DataService.updateTask(newTaskFormData.task_id, newTaskFormData)).then((response) => {
            console.log(`task updated`);
            console.log(`response: ${response}`);
        });
        
        handleClose();
        clearForm();
        setRefresh(true);
    };

    useEffect(() => {
        console.log(`use effect called`);
            
        if (!localStorage.hasOwnProperty('username')) {
            window.location.href = '/';
        }
        
        setRefresh(false);
        getTasks();

    }, [refresh, sortMode]); 


    const deleteTask = (event) => {
        let taskId = event.target.name;
        console.log(`delete id ${taskId}`);
        (DataService.deleteTask(taskId)).then((response) => {
            console.log(response);
            setRefresh(true);
        });
    };

    const getTasks = async () => {
        await (DataService.getUserTasks()).then((response) => {
            console.log(`tasks from db = ${JSON.stringify(response)}`);
            let sortedTasks = sortTasks(response);
            console.log(`sorted tasks from db = ${JSON.stringify(sortedTasks)}`)
            setUserTasks(sortedTasks);
            setLoading(false);
        });
    };


    const sortTasks = (taskArr) => {
        let sortedTaskArr = [];
        if (sortMode === 'title') {
            sortedTaskArr = taskArr.sort((task1, task2) => (task1.title > task2.title) ? 1 : (task1.title < task2.title) ? -1 : 0);
        } else if (sortMode === 'status') {
            sortedTaskArr = taskArr.sort((task1, task2) => (task1.status < task2.status) ? 1 : (task1.status > task2.status) ? -1 : 0);
        } else if (sortMode === 'due_date') {
            sortedTaskArr = taskArr.sort((task1, task2) => (task1.due_date < task2.due_date) ? 1 : (task1.due_date > task2.due_date) ? -1 : 0);
        } else {
            return taskArr;
        }
        return sortedTaskArr;
    }

    const showEditForm = (event) => {
        let task = event.target.name;
        console.log(`edit task: ${JSON.stringify(task)}`);
        task = JSON.parse(task);
        setTaskFormData({
            task_id: task.id,
            task_title: task.title,
            task_description: task.description,
            task_due_date: task.due_date,
            task_status: task.status,
        });
        console.log(`task form data: ${JSON.stringify(newTaskFormData)}`);
        setFormMode('edit');
        handleShow();

    };

    const clearForm = () => {
        setTaskFormData(
            { 
                task_title: '',
                task_description: '',
                task_due_date: '',
                task_status: '',
            }
        );
    };

    const showAddForm = () => {
        clearForm();
        setFormMode('add');
        handleShow();
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
                                <Button onClick={showAddForm}>+</Button>
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Group 
                                        className="mb-3"  
                                        name="sort_mode" 
                                        controlId="sort_mode"
                                        value={sortMode} 
                                        onChange={(e) => {setSortMode(e.target.value)}}
                                    >
                                        <Form.Label>Sort</Form.Label>
                                        <Form.Select>
                                            <option key='default' value='default'>Default</option>
                                            {sortingModes.map(mode => (
                                                <option key={mode} value={mode}>{mode}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="taskTable">
                        {/* <Row className="taskLine">
                            <Col className="taskHeader col-lg-3">TITLE</Col>
                            <Col className="taskHeader col-lg-4">DESCRIPTION</Col>
                            <Col className="taskHeader col-lg-2">DUE DATE</Col>
                            <Col className="taskHeader col-lg-2">STATUS</Col>
                            <Col className="taskHeader col-lg-1"></Col>
                        </Row> */}
                        {userTasks.map(task => (
                            <Row key={task.id} id={task.id} className="taskLine">
                                <Col className="taskInfo col-lg-10">
                                    <Row className="taskTitle">{task.title}</Row>
                                    <Row className="taskDesc">{task.description}</Row>
                                    <Row className="taskStatus">{task.status}</Row>
                                </Col>
                                <Col className="taskOptions col-lg-2 d-flex justify-content-end">
                                    <Row className="taskDate justify-content-end align-self-baseline">{task.due_date}</Row>
                                    <Row className="taskOptions d-flex justify-content-end align-self-end">
                                        <Button className="col-lg-4 m-1" name={task.id} onClick={deleteTask}>X</Button>
                                        <Button className="col-lg-4 m-1" name={JSON.stringify(task)} onClick={showEditForm}>Edit</Button>
                                    </Row>
                                </Col>
                                {/* <Col className="taskTitle col-lg-3">{task.title}</Col>
                                <Col className="taskDesc col-lg-4">{task.description}</Col>
                                <Col className="taskDate col-lg-2">{task.due_date}</Col>
                                <Col className="taskStatus col-lg-2">{task.status}</Col>
                                <Col className="taskButtons col-lg-1">
                                    <Row>
                                        <Col>
                                            <Button name={task.id} onClick={deleteTask}>X</Button>
                                        </Col>
                                        <Col>
                                            <Button name={JSON.stringify(task)} onClick={showEditForm}>Edit</Button>
                                        </Col>
                                    </Row>
                                </Col> */}
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
                        formMode={formMode}
                        newTaskFormData={newTaskFormData}
                        handleChange={handleChange}
                        submitAddForm={submitAddForm}
                        submitEditForm={submitEditForm}
                        setTaskFormData={setTaskFormData}
                    />
                </Modal.Body>
            </Modal>
        </>
    );

}

