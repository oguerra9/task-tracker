import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import DataService from '../services/dataService';

export default function NewTaskForm() {
    const [newTaskFormData, setTaskFormData] = useState(
        { 
            task_title: '',
            task_description: '',
            task_due_date: '',
            task_status: '',
        }
    ); 
    

    const statusOptions = ['completed', 'in_progress'];
       
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskFormData({ ...newTaskFormData, [name]: value });
    };

    // const submitForm = (event) => {
    //     event.preventDefault();

    //     newTaskFormData.task_due_date = new Date(newTaskFormData.task_due_date).getTime();
    //     console.log(JSON.stringify(newTaskFormData));

    //     (DataService.addTask(newTaskFormData)).then((response) => {
    //         console.log(`task created`);
    //     });

    // };

    return (
        <Form>
            <Container>
                <Form.Group className="mb-3" controlId="task_title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="task_title" onChange={handleChange} value={newTaskFormData.task_title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="task_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="task_description" value={newTaskFormData.task_description} onChange={handleChange} />
                </Form.Group>
            </Container>
            <Container>
                <Form.Group className="mb-3" controlId="task_due_date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="task_due_date"
                        placeholder="Due date"
                        value={newTaskFormData.task_due_date}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Container>
            <Container>
                <Form.Group 
                    className="mb-3"  
                    name="task_status" 
                    controlId="task_status"
                    value={newTaskFormData.task_status} 
                    onChange={e => {
                        console.log("selected task status", e.target.value);
                        setTaskFormData({ ...newTaskFormData, task_status: e.target.value });
                    }}
                >
                    <Form.Label>Status</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Container>
            <Button variant="primary" type="submit" onClick={submitForm}>
                Add Task
            </Button>
        </Form>
    );
}