import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { auth } from '../../firebase/firebase-utils'

function MessageStatus({type}) {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    const handleClick = () => {
        // upload code
        if(message !== null && user !== null){
            const data = {
                type:type,
                message:message,
                timestamp: new Date()
            }
    
            // for firebase
            console.log(data)
        }
    }
    return (
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} onClick={(e)=>setMessage(e.target.value)} placeholder='add your message' />
            </Form.Group>
            {message !== null ? <Button size='small' onClick={handleClick} style={{ width: '100%' }}>upload</Button> : null}
        </div>
    )
}

export default MessageStatus
