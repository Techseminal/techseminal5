import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { FaFile, FaSave, FaUserCircle, FaBell, FaCloudUploadAlt, FaGoogle } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { signInWithGoogle, firestore, signOut } from '../../firebase/firebase-utils'
import './Navbar.scss'
import { withRouter } from 'react-router-dom'

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
                        firestore.collection('Users').doc(result.user.uid).onSnapshot(querySnapshot => {
                            const userProfile = {
                                ...querySnapshot.data()
                            }
                            if(userProfile.username === '' && userProfile.bio === '') {
                                setShow(true);
                            }
                            else {
                                setShow(false);
                            }
                        })
                        console.log(result.user)
                    }
                    else {
                        firestore.collection('Users').doc(result.user.uid).set({
                            'username': '',
                            'bio': '',
                            'mail': result.user.email,
                            'facebook': '',
                            'instagram': '',
                            'twiiter': '',
                            'linkedIn': '',
                            'profileImgUrl': result.user.photoURL,
                            'saved': [],
                        })
                        setShow(true);
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
                <Button variant="primary" onClick={handleClose}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal>
    );
    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
                {ProfileModal}
                <Navbar.Brand href="#home" className="NavBrand">Tech Seminal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavbarToogle">
                    <FiMenu style={{ fontSize: '24px' }} />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {props.user ?
                            <>
                                <Nav.Link className="Navlink" href="#MyPosts"><i><FaFile style={{ color: '#00D1CE' }} /></i> My Posts</Nav.Link>
                                <Nav.Link className="Navlink" href="#Saved"><i><FaSave style={{ color: '#F4C726' }} /></i> Saved</Nav.Link>
                                <Nav.Link className="Navlink" onClick={signOut}><i><FaUserCircle style={{ color: '#007FDC' }} /></i> Profile</Nav.Link>
                                <Nav.Link className="Navlink" href="#Notifications"><i><FaBell style={{ color: 'tomato' }} /></i> Notifcations</Nav.Link>
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
