import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './Portray.scss'
import PortrayCard from './PortrayCard'
import PortrayData from './PortrayData'

function Portray() {
    return (
        <Row className="Portray">
            <Col className="ColPortray">
                {
                    PortrayData.map(portray => (
                        <PortrayCard key={portray.id} img={portray.image} title={portray.title} author={portray.author} tags={portray.tags} id={portray.id} />
                    ))
                }
            </Col>
        </Row>
    )
}

export default Portray
