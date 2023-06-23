import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Styler from '../utils/Styler';
import '../style.css';

export default function TaskList(props) {

    const displayDate = (dueDateTS) => {
        if (dueDateTS === '') {
            return '';
        }
        let tsDate = new Date(dueDateTS);
        tsDate.setDate(tsDate.getDate() + 1);        

        let dateString = `${tsDate.getMonth() + 1}/${tsDate.getDate()}/${tsDate.getFullYear()}`;
        return dateString;
    };

    const buttonStyle = {'backgroundColor':(props.Styler.colors).buttonBack, 'color': (props.Styler.colors).buttonText};

    if (props.userTasks.length === 0) {

        return (
            <Container>
                <h4 id="insTask" className="d-inline-flex p-2">Click the + to add your first task</h4>
                <Xarrow 
                    start="insTask" 
                    end="addTaskButton" 
                    strokeWidth={2}
                    color={'black'}
                    curveness={0.5}
                    dashness={true}
                />
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
                            <Button id="myBtn" style={buttonStyle} className="col-lg-4 m-1 d-flex justify-content-center" name={task.id} onClick={props.deleteTask}>🗑️</Button>
                            <Button id="myBtn" style={buttonStyle} className="col-lg-4 m-1 d-flex justify-content-center" name={JSON.stringify(task)} onClick={props.showEditForm}>✏️</Button>
                        </Row>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}