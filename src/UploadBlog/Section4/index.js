import React from 'react'
import {Nav,Row} from 'react-bootstrap'
import './styles.scss'

function Section4({status,HdStatus}) {
    return (
        <div style={{ textAlign: 'center', minHeight: '500px' }}>
            <h2 style={{ fontFamily: 'Poppins' }}>Setup your journey point</h2>
            <Row className="justify-content-md-center Categories">
                <Nav defaultActiveKey={status} className="TagesMenu">
                    <Nav.Link onClick={(e)=>HdStatus(e.target.value)} className="Tags" href="#Stage1">Stage1</Nav.Link>
                    <Nav.Link onClick={(e)=>HdStatus(e.target.value)} className="Tags" href="#Stage2">Stage2</Nav.Link>
                    <Nav.Link onClick={(e)=>HdStatus(e.target.value)} className="Tags" href="#Stage3">Stage3</Nav.Link>
                    <Nav.Link onClick={(e)=>HdStatus(e.target.value)} className="Tags" href="#Stage4">Stage4</Nav.Link>
                    <Nav.Link onClick={(e)=>HdStatus(e.target.value)} className="Tags" href="#Stage5">Stage5</Nav.Link>
                    <Nav.Link onClick={(e)=>HdStatus(e.target.value)} className="Tags" href="#Stage6">Stage6</Nav.Link>
                </Nav>
            </Row>
        </div>
    )
}

export default Section4
