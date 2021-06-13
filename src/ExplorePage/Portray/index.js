import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { firestore } from '../../firebase/firebase-utils'
import PortrayCard from './PortrayCard'

import './Portray.scss'

function Portray() {
    const [Blogs, setBlogs] = useState([]);
    useEffect(() => {
        firestore.collection('Blogs').onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setBlogs(blogs);
        })
    }, []);
    return (
        <Row className="Portray">
            <Col className="ColPortray">
                {
                    Blogs.map(blog => (
                        <PortrayCard key={blog.id} img={blog.image} title={blog.title} author={blog.author} tags={blog.tags} id={blog.id} />
                    ))
                }
            </Col>
        </Row>
    )
}

export default Portray
