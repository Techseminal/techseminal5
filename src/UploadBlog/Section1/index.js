import React from 'react'
import './Categories.scss'
import { Form, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'

const Categories = ({category, CallBack}) => {

    return (
        <motion.div
            initial={{ x: '-50vw' }}
            animate={{ x: '0' }}
            transition={{ delay: '0.5s', type: 'tween' }}
            className="Categories"
        >
            <div className="Dropdown">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="CatLabel">Select your Category</Form.Label>
                    <Form.Control onChange={e=>CallBack(e.target.value)} as="select" defaultValue={category}>
                        <option>Choose...</option>
                        <option>Project</option>
                        <option>Business Idea</option>
                        <option>Service</option>
                        <option>Invention</option>
                        <option>Problem Statement</option>
                    </Form.Control>
                    <cite>Take the help of below info</cite>
                </Form.Group>
            </div>
            <div></div>
        </motion.div>
    )
}

export default Categories
