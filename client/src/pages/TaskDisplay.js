import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewTaskForm from '../components/NewTaskForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TaskList from '../components/TaskList';
import DataService from '../services/dataService';
import '../style.css';


export default function TaskDisplay(props) {
    let user = localStorage.getItem("username");

    const [formMode, setFormMode] = useState('');

    const [sortMode, setSortMode] = useState('Sort');
    let sortingModes = ['title', 'status', 'due-date'];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true);

    const [refresh, setRefresh] = useState(true);

    const [userTasks, setUserTasks] = useState([]);

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

        (DataService.addTask(newTaskFormData)).then((response) => {
            console.log(`task added`);
        });

        handleClose();
        clearForm();
        setRefresh(true);

    };

    const submitEditForm = async (event) => {
        event.preventDefault();

        await (DataService.updateTask(newTaskFormData.task_id, newTaskFormData)).then((response) => {
            console.log(`task updated`);
        });
        
        handleClose();
        clearForm();
        setRefresh(true);
    };

    useEffect(() => {
        if (refresh === true) {
            
            if (!localStorage.hasOwnProperty('username')) {
                props.handlePageChange('login');
            }
        
            getTasks();
        
            setRefresh(false);
        }

    }, [refresh, sortMode]); 


    const deleteTask = (event) => {
        let taskId = event.target.name;
        (DataService.deleteTask(taskId)).then((response) => {
            console.log(`task deleted`);
            setRefresh(true);
        });
    };

    const getTasks = async () => {
        await (DataService.getUserTasks()).then((response) => {
            console.log(`tasks retrieved`);
            let sortedTasks = sortTasks(response);
            console.log(`tasks sorted`);
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
        } else if (sortMode === 'due-date') {
            sortedTaskArr = taskArr.sort((task1, task2) => (task1.due_date > task2.due_date) ? 1 : (task1.due_date < task2.due_date) ? -1 : 0);
        } else {
            return taskArr;
        }
        return sortedTaskArr;
    }

    const showEditForm = (event) => {
        let task = event.target.name;
        task = JSON.parse(task);
        setTaskFormData({
            task_id: task.id,
            task_title: task.title,
            task_description: task.description,
            task_due_date: task.due_date,
            task_status: task.status,
        });
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
                        <Row className='d-flex'>
                            <Col className="d-inline-flex">
                                <h1>{user}'s Tasks</h1>
                            </Col>
                            <Col className="d-flex justify-content-end align-self-end">
                                <Form>
                                    <Form.Group 
                                        className="mb-1 d-inline-flex"  
                                        name="sort_mode" 
                                        controlId="sort_mode"
                                        value={sortMode} 
                                        onChange={(e) => {setSortMode(e.target.value)}}
                                    >
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
                    <TaskList 
                        userTasks={userTasks}
                        deleteTask={deleteTask}
                        showEditForm={showEditForm}
                    />
                    {/* <Container className="taskTable">
                        {userTasks.map(task => (
                            <Row key={task.id} id={task.id} className="taskLine">
                                <Col className="taskInfo col-lg-10">
                                    <Row className="taskTitle">{task.title}</Row>
                                    <Row className="taskDesc">{task.description}</Row>
                                    <Row className="taskStatus">{task.status}</Row>
                                </Col>
                                <Col className="taskOptions col-lg-2 d-flex align-items-end flex-column">
                                    <Row className="taskDate d-inline-flex align-self-end m-1 mb-auto">{displayDate(task.due_date)}</Row>
                                    <Row className="taskOptions d-inline-flex justify-content-end align-self-end">
                                        <Button className="col-lg-4 m-1 d-flex justify-content-center" name={task.id} onClick={deleteTask}>🗑️</Button>
                                        <Button className="col-lg-4 m-1 d-flex justify-content-center" name={JSON.stringify(task)} onClick={showEditForm}>✏️</Button>
                                    </Row>
                                </Col>
                            </Row>
                        ))}
                    </Container>  */}  
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
            <Button id="addTaskButton" onClick={showAddForm}><h1 className="m-0 p-0 d-inline">+</h1></Button>
        </>
    );

}
// delete icons ✕✖️🗑️
// edit icons 🔧⚙️✏️✂️

