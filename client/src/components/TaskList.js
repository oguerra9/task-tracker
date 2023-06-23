import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../style.css';

export default function TaskList(props) {

    const displayDate = (dueDateTS) => {
        let tsDate = new Date(dueDateTS);
        tsDate.setDate(tsDate.getDate() + 1);        

        let dateString = `${tsDate.getMonth() + 1}/${tsDate.getDate()}/${tsDate.getFullYear()}`;
        return dateString;
    };

    if (props.userTasks.length === 0) {
        return (
            <Container>
                <Row className="m-5">
                    <h3>Click the + to add your first task</h3>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="taskTable">
            {props.userTasks.map(task => (
                <Row key={task.id} id={task.id} className="taskLine">
                    <Col className="taskInfo col-lg-10">
                        <Row className="taskTitle">{task.title}</Row>
                        <Row className="taskDesc">{task.description}</Row>
                        <Row className="taskStatus">{task.status}</Row>
                    </Col>
                    <Col className="taskOptions col-lg-2 d-flex align-items-end flex-column">
                        <Row className="taskDate d-inline-flex align-self-end m-1 mb-auto">{displayDate(task.due_date)}</Row>
                        <Row className="taskOptions d-inline-flex justify-content-end align-self-end">
                            <Button className="col-lg-4 m-1 d-flex justify-content-center" name={task.id} onClick={props.deleteTask}>🗑️</Button>
                            <Button className="col-lg-4 m-1 d-flex justify-content-center" name={JSON.stringify(task)} onClick={props.showEditForm}>✏️</Button>
                        </Row>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}