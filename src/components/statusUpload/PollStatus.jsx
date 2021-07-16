import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { auth } from '../../firebase/firebase-utils'

function PollStatus({ type }) {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('LIKE');
    const [left, setLeft] = useState('DISLIKE');
    const [right, setRight] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    const handleClick = () => {

        // upload code
        if(title !== null && user !== null){
            const data = {
                type:type,
                title:title,
                left:left,
                right:right,
                timestamp: new Date()
            }
    
            // for firebase
            console.log(data)
        }
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Title of poll</Form.Label>
                <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} placeholder='add your question ...' />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Set polling fields</Form.Label>
                <Row>
                    <Col>
                        <Form.Control style={{textTransform:'uppercase'}} type="text" onChange={(e) => setLeft(e.target.value)} defaultValue='like' />
                    </Col>
                    <Col>
                        <Form.Control style={{textTransform:'uppercase'}} type="text" onChange={(e) => setRight(e.target.value)} defaultValue='dislike'/>
                    </Col>
                </Row>
            </Form.Group>
            {title !== null ? <Button size='small' onClick={handleClick} style={{ width: '100%' }}>upload</Button> : null}
        </div>
    )
}

export default PollStatus