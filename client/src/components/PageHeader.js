import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function PageHeader() {

    const logout = () => {
        localStorage.removeItem('username');
        window.location.href = '/';
    }

    return (
        <div className="bg-primary min-100-vh">
            <Row> 
                <Col>
                    <h1>Task Manager</h1>
                </Col>
                <Col>
                    <Button onClick={logout}>Logout</Button>
                </Col>
            </Row>
        </div>
    );
}