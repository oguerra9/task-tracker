import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DataService from '../services/dataService';

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

export default function Login() {
    const [username, setUsername] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsername(value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        console.log(`username: ${username}`);
        localStorage.setItem("username", username);

        setSubmitted(true);
        window.location.href = '/taskDisplay';
    };

    // const renderUserInfo = (username) => {
    //     return <UserInfo propsUser={username}/>;
    // };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={username} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Login
                </Button>
            </Form>
            <Container>
                {submitted ? (
                    <UserInfo propsUser={username}/>
                ) : (
                    <p>not yet submitted</p>
                )}
            </Container>
        </Container>
    )
}

function UserInfo(props) {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [userExists, setUserExists] = useState(null);

    useEffect(() => {
        async function getUserData(username) {
            // await getDocs(collection(db, "users"))
            //     .then((querySnapshot)=>{               
            //         const newData = querySnapshot.docs
            //             .map((doc) => ({...doc.data(), id:doc.id }));
            //         //console.log(newData);
            //         setUserData(newData);
            //         setLoading(false);
            //     })
            let docRef = doc(db, 'users', username);
            //let docSnap = await getDoc(docRef);

            await getDoc(docRef)
                .then((querySnapshot) => {
                    if (querySnapshot.exists()) {
                        setUserExists(true);
                        console.log(`user data: ${JSON.stringify(querySnapshot.data())}`);
                        setUserData(querySnapshot.data());
                        setLoading(false);
                    } else {
                        setUserExists(false);
                        console.log(`user with name ${username} could not be found`);
                    }
                })

            // if (docSnap.exists()) {
            //     console.log("Document data:", docSnap.data());
            //     //setUserData(docSnap.data());
            //     //setLoading(false);
            // } else {
            //     console.log(`Document for user ${username} could not be found`);
            // }

        }
        getUserData(props.propsUser);
    }, []);

    return (
        <Container>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Container>
                    <p>User Data: {JSON.stringify(userData)}</p>
                </Container>
            )}
        </Container>
    );
}

// function UserInfo(props) {
//     const [userData, setUserData] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         getUserData(props.propsUser);
//     });

//     const getUserData = (username) => {
//         (DataService.getUser(username)).then((response) => {
//             setUserData(response);
//             setLoading(false);
//         });
//     };
    
//     return (
//         <Container>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <p>User Data: {JSON.stringify(userData)}</p>
//             )}
//         </Container>
//     );
// }