import React from 'react'
import { Col, Container, Row, InputGroup, FormControl, Nav } from 'react-bootstrap'
import './SearchBar.scss'

function SearchBar() {

    return (
        <Container className="Filter">
            <Row className="justify-content-md-center">
                <Col sm={12} md={6} lg={6} className="SearchBar">
                    <InputGroup size="md">
                        <FormControl aria-label="Medium" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." className="SearchField" />
                    </InputGroup>
                    <select>
                        <option value="1">Latest</option>
                        <option value="2">More Stars</option>
                    </select>
                </Col>
            </Row>
            <Row className="justify-content-md-center Categories">
                <Nav defaultActiveKey="#All" className="TagesMenu">
                    <Nav.Link className="Tags" title="All categorie Ideas" href="#All">All</Nav.Link>
                    <Nav.Link className="Tags" title="Developing existing Ideas" href="#Projects">Projects</Nav.Link>
                    <Nav.Link className="Tags" title="Ideas related to business & revenue" href="#BusinessIdea">Business Ideas</Nav.Link>
                    <Nav.Link className="Tags" title="profit or non-profit favours" href="#Service">Service</Nav.Link>
                    <Nav.Link className="Tags" title="Idea that introduces new technology" href="#Invention">Invention</Nav.Link>
                    <Nav.Link className="Tags" title="Concise discp of the problem or issues" href="#ProblemStatement">Problem Statement</Nav.Link>
                </Nav>
            </Row>
        </Container>
    )
}

export default SearchBar
