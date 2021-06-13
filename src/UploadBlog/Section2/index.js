import React from 'react'
import { Form, Container, InputGroup, FormControl, Button, Badge } from 'react-bootstrap'

function Section2({ title, discp, tags, HdTitle, HdDiscp, HdTags }) {

    const handleTags = () => {
        let value = document.getElementById("tagField").value
        HdTags([...tags, value]);
        document.getElementById("tagField").value = "";
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
                    <Form.Control as="textarea" onChange={e => HdDiscp(e.target.value)} value={discp} rows={10} placeholder="describe your idea..." />
                </Form.Group>
                <br />
                <Form.Label style={{ fontFamily: 'Poppins', fontSize: '18px', color: '#007EDB' }}>Add Tags</Form.Label>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter Tags one by one.."
                        aria-label="Enter Tags one by one.."
                        aria-describedby="basic-addon2"
                        id="tagField"
                    />
                    <InputGroup.Append>
                        <Button onClick={handleTags} variant="outline-primary" style={{ padding: '5px 20px' }}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
                {
                    tags.map(tag => (
                        <Badge key={tag} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => delTag(tag)} title='onClick delete tag' pill variant="dark">
                            {tag}
                        </Badge>
                    ))
                }
            </Form>
        </Container>
    )
}

export default Section2
