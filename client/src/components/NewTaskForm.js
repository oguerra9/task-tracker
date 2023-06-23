import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import DataService from '../services/dataService';

export default function NewTaskForm(props) {
   
    const statusOptions = ['completed', 'in_progress'];

    let addMode = false;

    if (props.formMode === 'Add') {
        addMode = true;
    }

    return (
        <Form>
            <Container>
                <Form.Group className="mb-3" controlId="task_title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="task_title" onChange={props.handleChange} value={props.newTaskFormData.task_title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="task_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="task_description" value={props.newTaskFormData.task_description} onChange={props.handleChange} />
                </Form.Group>
            </Container>
            <Container>
                <Form.Group className="mb-3" controlId="task_due_date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="task_due_date"
                        placeholder="Due date"
                        value={props.newTaskFormData.task_due_date}
                        onChange={props.handleChange}
                    />
                </Form.Group>
            </Container>
            <Container>
                <Form.Group 
                    controlId="task_status"
                >
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        className="mb-3"  
                        name="task_status" 
                        value={props.newTaskFormData.task_status} 
                        onChange={(e) => {props.setTaskFormData({ ...props.newTaskFormData, task_status: e.target.value })}}
                    >
                        <option value="" disabled>Select</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Container>

            {addMode ? (
                <Button variant="primary" type="submit" onClick={props.submitAddForm}>
                    Add Task
                </Button>
            ) : (
                <Button variant="primary" type="submit" onClick={props.submitEditForm}>
                    Update Task
                </Button>
            )}
            
        </Form>
    );
}