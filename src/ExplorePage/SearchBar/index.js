import React, { useEffect, useState } from 'react'
import { firestore } from '../../firebase/firebase-utils'
import { Col, Container, Row, InputGroup, FormControl, Nav } from 'react-bootstrap'
import './SearchBar.scss'

function SearchBar(props) {
    const [DataList, setDataList] = useState([]);
    const [tags, settags] = useState([]);
    useEffect(() => {
        firestore.collection('Blogs').onSnapshot(querySnapshot => {
            let datalist = querySnapshot.docs.map(doc => {
                return {
                    title: doc.data().title,
                    author: doc.data().author,
                    tags: doc.data().tags
                };
            })
            setDataList(datalist)
            let tags = datalist.map((data) => {
                return data.tags;
            })
            tags = tags.reduce((elem1, elem2) => elem1.concat(elem2))
            tags = [...new Set(tags)]
            settags(tags)
        })
    }, []);
    return (
        <Container className="Filter">
            <Row className="justify-content-md-center">
                <Col sm={12} md={6} lg={6} className="SearchBar">
                    <InputGroup size="md">
                        <FormControl aria-label="Medium" list="search"
                            onChange={(e) => e.target.value === '' ? props.setsearchKey('') : null}
                            onKeyUp={(e) => e.keyCode === 13 ? props.setsearchKey(e.target.value) : null}
                            aria-describedby="inputGroup-sizing-sm" placeholder="Search..." className="SearchField" />
                    </InputGroup>
                    <datalist id="search">
                        {props.filter === 'tags' ? tags.map((tag) => <option value={tag} key={tag}/>) : null}
                        {props.filter === 'title' ? DataList.map((data) => <option value={data.title} key={data.title}/>) : null}
                        {props.filter === 'user' ? DataList.map((data) => <option value={data.author} key={data.author}/>) : null}
                    </datalist>
                    <select onChange={(e) => props.setfilter(e.target.value)} style={{ padding: '10px', float: 'right' }}>
                        <option value="tags">Keyword</option>
                        <option value="title">Titles</option>
                        <option value="user">users</option>
                    </select>

                </Col>
            </Row>
            <Row className="justify-content-md-center Categories">
                <Nav className="TagesMenu">
                    <Nav.Link className={props.category === 'All' ? 'Tags active' : 'Tags'} title="All categorie Ideas" onClick={() => props.setcategory('All')}>All</Nav.Link>
                    <Nav.Link className={props.category === 'Project' ? 'Tags active' : 'Tags'} title="Developing existing Ideas" onClick={() => props.setcategory('Project')} >Projects</Nav.Link>
                    <Nav.Link className={props.category === 'Business Idea' ? 'Tags active' : 'Tags'} title="Ideas related to business & revenue" onClick={() => props.setcategory('Business Idea')}>Business Ideas</Nav.Link>
                    <Nav.Link className={props.category === 'Service' ? 'Tags active' : 'Tags'} title="profit or non-profit favours" onClick={() => props.setcategory('Service')}>Service</Nav.Link>
                    <Nav.Link className={props.category === 'Invention' ? 'Tags active' : 'Tags'} title="Idea that introduces new technology" onClick={() => props.setcategory('Invention')}>Invention</Nav.Link>
                    <Nav.Link className={props.category === 'ProblemStatement' ? 'Tags active' : 'Tags'} title="Concise discp of the problem or issues" onClick={() => props.setcategory('ProblemStatement')}>Problem Statement</Nav.Link>
                </Nav>
            </Row>
            <center>
                <select className="filter" onChange={(e) => props.setsort(e.target.value)}>
                    <option value="timestamp">Latest</option>
                    <option value="stars">More Stars</option>
                </select>
            </center>
        </Container>
    )
}

export default SearchBar
