import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DataService from '../services/dataService';

export default function SettingsForm(props) {
    let currUser = localStorage.getItem('username');
    const [userSettings, setUserSettings] = useState('');

    let schemeOptions = ['Default', 'Blues', 'Summer', 'Forest', 'Beach', 'Dark Neutral', 'Greens', 'Autumn'];

    const getUserSettings = async () => {
        await (DataService.getUserStatus(currUser))
            .then((response) => {
                setUserSettings(response.colorScheme);
            });
    };

    useEffect(() => {
        getUserSettings();
    }, []);

    const submitSaveSettings = async (event) => {
        event.preventDefault();
        localStorage.setItem('colorScheme', userSettings);
    
        await (DataService.updateUser(currUser, userSettings)).then((response) => {
                console.log(`user updated`);
            });
            
        props.handleCloseSettings();
        props.handleSettingsUpdated();
    }

    return (
        <Container>
            
            <Form>
                <Form.Group 
                    controlId="userColorScheme"
                >
                    <Form.Label>Color Scheme</Form.Label>
                    <Form.Select
                        className="mb-3"  
                        name="userSettings" 
                        value={userSettings} 
                        onChange={(e) => {setUserSettings(e.target.value)}}
                    >
                        {schemeOptions.map(schemeName => (
                            <option key={schemeName} value={schemeName}>{schemeName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button id="myBtn" type="submit" onClick={submitSaveSettings}>
                    Save Settings
                </Button>
            </Form>
        </Container>
    );

}