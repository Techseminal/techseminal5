import React from 'react';
import './Navbar.scss'
import { Navbar, Nav, Button } from "react-bootstrap";
import {FaFile, FaSave,FaUserCircle, FaBell,FaCloudUploadAlt } from 'react-icons/fa'
import {FiMenu} from 'react-icons/fi'

function NavBar() {

    return (
        <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
            <Navbar.Brand href="#home" className="NavBrand">Tech Seminal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavbarToogle">
                <FiMenu style={{fontSize:'24px'}}/>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="Navlink" href="#MyPosts"><i><FaFile style={{color:'#00D1CE'}}/></i> My Posts</Nav.Link>
                    <Nav.Link className="Navlink" href="#Saved"><i><FaSave style={{color:'#F4C726'}} /></i> Saved</Nav.Link>
                    <Nav.Link className="Navlink" href="#Profile"><i><FaUserCircle style={{color:'#007FDC'}} /></i> Profile</Nav.Link>
                    <Nav.Link className="Navlink" href="#Notifications"><i><FaBell style={{color:'tomato'}} /></i> Notifcations</Nav.Link>
                    <Button variant='primary' className="UploadBtn"><FaCloudUploadAlt style={{marginRight:'5px',fontSize:'18px'}}/>upload</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;
