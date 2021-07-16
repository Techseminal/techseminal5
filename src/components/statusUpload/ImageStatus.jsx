import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { auth } from '../../firebase/firebase-utils'

function ImageStatus({ type }) {
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);
    const [caption, setCaption] = useState('')

    const handleFileChange = (e) => {
        if (e.target.files.length !== 0) {
            console.log(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
        } else {
            window.alert("Select Image File")
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    const handleClick = () => {
        if (image !== null && user !== null) {
            const data = {
                type: type,
                image: image,
                caption:caption
            }

            //for firebase
            console.log(data)
        }
    }

    return (
        <div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select file to upload</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} accept="image/png, image/gif, image/jpeg" />
            </Form.Group>
            <img src={image} alt="" style={{ width: '100%', height: 'auto', margin: '20px 0' }} />
            {image ? <Form.Control type="text" onChange={(e) => setCaption(e.target.value)} placeholder="Add caption (optional)" /> : null}
            <br/>
            {image !== null ? <Button size='small' onClick={handleClick} style={{ width: '100%' }}>upload</Button> : null}
        </div>
    )
}

export default ImageStatus
