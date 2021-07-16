import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { FaFile, FaUserCircle, FaBell, FaCloudUploadAlt, FaGoogle } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { FiMenu } from 'react-icons/fi'
import { signInWithGoogle, firestore } from '../../firebase/firebase-utils'
import './Navbar.scss'
import { withRouter } from 'react-router-dom'
import { cleanup } from '@testing-library/react';

function NavBar(props) {
    const [users, setusers] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleUpload = () => {
        props.history.push('/upload')
    }

    useEffect(() => {
        firestore.collection('Users').onSnapshot(querySnapshot => {
            const users = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    name: doc.data().username
                }
            })
            setusers(users);
        })
        return cleanup();
    }, []);

    function signIn() {
        signInWithGoogle()
            .then((result) => {
                if (result.user) {
                    if (users.find((user) => user.id === result.user.uid)) {
                        firestore.collection('Users').doc(result.user.uid).onSnapshot(querySnapshot => {
                            const userProfile = {
                                ...querySnapshot.data()
                            }
                            if (userProfile.bio === '') {
                                setShow(true);
                            }
                            else {
                                setShow(false);
                            }
                        })
                    }
                    else {
                        let username = result.user.displayName
                        if (users.find((user) => user.name.replace(/\s/g, "") === result.user.displayName.replace(/\s/g, ""))) {
                            username = ''
                        }
                        else {
                            username = result.user.displayName
                        }
                        firestore.collection('Users').doc(result.user.uid).set({
                            'username': username,
                            'nickname': '',
                            'bio': '',
                            'mail': result.user.email,
                            'facebook': '',
                            'instagram': '',
                            'twitter': '',
                            'linkedIn': '',
                            'profileImgUrl': result.user.photoURL,
                            'saved': [],
                            'skills': [],
                            'payment': {'gpay': '', 'phonepe': ''},
                            'followers': [],
                            'following': [],
                            'notifications':[]
                        })
                        props.history.push('/profile?edit=true')
                    }
                }
            })
    }

    const ProfileModal = (
        <Modal show={show} size="sm">
            <Modal.Header style={{ padding: '20px' }}>
                <Modal.Title>Complete your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>Fill your details and set up your profile</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Skip For Now
                </Button>
                <Button variant="primary" onClick={() => props.history.push('/profile?edit=true')}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal>
    );
    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
                {ProfileModal}
                <Navbar.Brand href="#home" className="NavBrand" style={{ color: '#131B26' }}>Tech Seminal</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link id='bellS' className="Navlink" href="#Notifications" style={{ margin: '0 5px' }}><FaBell style={{ color: 'tomato', fontSize: '20px' }} /></Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavbarToogle">
                    <FiMenu style={{ fontSize: '24px' }} />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {props.user ?
                            <>
                                <Nav.Link className="Navlink" onClick={() => props.history.push('/')}><i><AiFillHome style={{ color: '#FF8862' }} /></i> Home</Nav.Link>
                                <Nav.Link className="Navlink" onClick={() => props.history.push('/profile')}><i><FaUserCircle style={{ color: '#007FDC' }} /></i> Profile</Nav.Link>
                                <Nav.Link className="Navlink" ><i><FaFile style={{ color: '#00D1CE' }} /></i> Docs</Nav.Link>
                                <Nav.Link id='bellL' className="Navlink" onClick={() => props.history.push('/notifications')} style={{ margin: '0 5px' }}><FaBell style={{ color: 'tomato', fontSize: '20px' }} /></Nav.Link>
                                <Button variant='primary' className="UploadBtn" onClick={handleUpload}><FaCloudUploadAlt style={{ marginRight: '5px', fontSize: '18px' }} />upload</Button>
                            </>
                            : <Button variant='primary' className="UploadBtn" onClick={signIn}><FaGoogle style={{ marginRight: '5px', fontSize: '18px' }} />sign in</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default withRouter(NavBar)