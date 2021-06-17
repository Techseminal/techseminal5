import React from 'react'
import { Form, Container, InputGroup, FormControl, Button, Badge } from 'react-bootstrap'
import { AiFillCloseCircle } from 'react-icons/ai'
import TextEditor from './TextEditor.jsx'

function Section2({ title, discp, tags, HdTitle, HdDiscp, HdTags }) {

    const handleTags = () => {
        let value = document.getElementById("tagField").value
        if(value !== ''){
            HdTags([...tags, value]);
            document.getElementById("tagField").value = "";
        }
    }

    const delTag = (value) => {
        let filtered = tags.filter(tag => tag !== value);
        HdTags(filtered)
    }
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label style={{ fontFamily: 'Poppins', fontSize: '18px', color: '#007EDB' }}>Title</Form.Label>&nbsp;&nbsp;
                    <cite style={{ color: 'gray', fontSize: '12px' }}>Maximum 100 characters only</cite>
                    <br />
                    <Form.Control type="text" onChange={e => HdTitle(e.target.value)} value={title} placeholder="enter title of your idea..." />
                </Form.Group>
                <br />
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ fontFamily: 'Poppins', fontSize: '18px', color: '#007EDB' }}>Desciption</Form.Label>&nbsp;&nbsp;
                    <cite style={{ color: 'gray', fontSize: '12px' }}>Minimum of 500 characters</cite>
                    {/* riche text editor */}
                    <TextEditor discp={discp} HdDiscp={HdDiscp} />
                </Form.Group>
                <br />

                {/* Tags */}
                <Form.Group>
                    <Form.Label style={{ fontFamily: 'Poppins', fontSize: '18px', color: '#007EDB' }}>Add Tags</Form.Label>&nbsp;&nbsp;
                    <cite style={{ color: 'gray', fontSize: '12px' }}>Mostly use suggested tags (min 2 tags)</cite>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Enter Tags one by one.."
                            aria-label="Enter Tags one by one.."
                            aria-describedby="basic-addon2"
                            id="tagField"
                        />
                        <InputGroup.Append>
                            <Button type='submit'  onClick={(e) => { e.preventDefault(); handleTags(); }} variant="outline-primary" style={{ padding: '5px 20px' }}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                {
                    tags.map(tag => (
                        <Badge key={tag} style={{ marginRight: '10px', fontSize: '14px' }} pill variant="dark">
                            <AiFillCloseCircle style={{ cursor: 'pointer' }} title='onClick delete tag' onClick={() => delTag(tag)} />&nbsp;{tag}
                        </Badge>
                    ))
                }
            </Form>
        </Container>
    )
}

export default Section2
