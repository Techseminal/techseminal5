import React from 'react'
import { Col, Row } from 'react-bootstrap'
import PortrayCard from './PortrayCard'
import './Portray.scss'

function Portray(props) {
    return (
        <Row className="Portray">
            <Col className="ColPortray">
                {
                    props.Blogs.map(blog => (
                        <PortrayCard
                            delete={props.delete}
                            user={props.user}
                            key={blog.id}
                            img={blog.image}
                            title={blog.title}
                            author={blog.author}
                            tags={blog.tags}
                            stars={blog.stars}
                            saved={props.saved}
                            id={blog.id} />
                    ))
                }
            </Col>
        </Row>
    )
}

export default Portray
