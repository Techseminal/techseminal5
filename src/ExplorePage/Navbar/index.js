import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { FaFile, FaSave, FaUserCircle, FaBell, FaCloudUploadAlt, FaGoogle } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { signInWithGoogle, firestore, signOut } from '../../firebase/firebase-utils'

import './Navbar.scss'
<<<<<<< HEAD
import { Navbar, Nav, Button } from "react-bootstrap";
import { FaFile, FaSave, FaUserCircle, FaBell, FaCloudUploadAlt } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import {withRouter} from 'react-router-dom'

function NavBar(props) {

    const handleUpload = () => {
        props.history.push('/upload');
=======

function NavBar(props) {
    const [users, setusers] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        firestore.collection('Users').onSnapshot(querySnapshot => {
            const users = querySnapshot.docs.map((doc) => {
                return doc.id
            })
            setusers(users);
        })
    }, []);

    function signIn() {
        signInWithGoogle()
            .then((result) => {
                if (result.user) {
                    if (users.find((user) => user === result.user.uid)) {
                        setShow(false);
                    }
                    else {
                        setShow(true);
                    }
                }
            })
>>>>>>> c4419b2883dee263cbcdc7e286a143942b496cc5
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
                <Button variant="primary" onClick={handleClose}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal>
    );
    return (
<<<<<<< HEAD
        <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
            <Navbar.Brand href="#home" className="NavBrand">Tech Seminal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavbarToogle">
                <FiMenu style={{ fontSize: '24px' }} />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="Navlink" href="#MyPosts"><i><FaFile style={{ color: '#00D1CE' }} /></i> My Posts</Nav.Link>
                    <Nav.Link className="Navlink" href="#Saved"><i><FaSave style={{ color: '#F4C726' }} /></i> Saved</Nav.Link>
                    <Nav.Link className="Navlink" href="#Profile"><i><FaUserCircle style={{ color: '#007FDC' }} /></i> Profile</Nav.Link>
                    <Nav.Link className="Navlink" href="#Notifications"><i><FaBell style={{ color: 'tomato' }} /></i> Notifcations</Nav.Link>
                    <Button onClick={ handleUpload } variant='primary' className="UploadBtn"><FaCloudUploadAlt style={{ marginRight: '5px', fontSize: '18px' }} />upload</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
=======
        <>
            <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
                {ProfileModal}
                <Navbar.Brand href="#home" className="NavBrand">Tech Seminal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavbarToogle">
                    <FiMenu style={{ fontSize: '24px' }} />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="Navlink" href="#MyPosts"><i><FaFile style={{ color: '#00D1CE' }} /></i> My Posts</Nav.Link>
                        <Nav.Link className="Navlink" href="#Saved"><i><FaSave style={{ color: '#F4C726' }} /></i> Saved</Nav.Link>
                        <Nav.Link className="Navlink" href="#Profile"><i><FaUserCircle style={{ color: '#007FDC' }} /></i> Profile</Nav.Link>
                        <Nav.Link className="Navlink" href="#Notifications"><i><FaBell style={{ color: 'tomato' }} /></i> Notifcations</Nav.Link>
                        <Button variant='primary' className="UploadBtn"><FaCloudUploadAlt style={{ marginRight: '5px', fontSize: '18px' }} />upload</Button>
                        {props.user ? <Nav.Link className="UploadBtn" onClick={signOut}><img alt="uIMG" src={props.user.photoURL} height="35" width="35" style={{ borderRadius: '20px' }} /> {props.user.displayName.replace(/\s+/g, '')}</Nav.Link>
                            : <Button variant='primary' className="UploadBtn" onClick={signIn}><FaGoogle style={{ marginRight: '5px', fontSize: '18px' }} />sign in</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
>>>>>>> c4419b2883dee263cbcdc7e286a143942b496cc5
    )
}

export default withRouter(NavBar);
