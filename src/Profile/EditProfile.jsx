import React from 'react'
import { Row, Col, Image, Button, Alert, Form, InputGroup, FormControl } from 'react-bootstrap'
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai'

function EditProfile(props) {
    return (
        <Row className="EditProfile">
            <Col sm={12} md={4} style={{ textAlign: 'center' }}>
                <Image className="photoURL" src={props.user.photoURL} alt="" /><br /><br />
                <Alert variant='danger' style={{ fontSize: '14px' }}>
                    Since you have been logged in with Google Account,
                    You can change your profile picture in your Google Account itself.
                </Alert><br />
            </Col>
            <Col sm={12} md={8}>
                <br />
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" defaultValue={props.user.displayName} placeholder="enter unique usename" />
                        <Form.Text className="text-muted">
                            Help people discover your account by using your usename
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <fieldset disabled>
                        <Form.Group>
                            <Form.Label htmlFor="disabledTextInput">Email address</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={props.user.email} />
                            <Form.Text className="text-muted">
                                You cannot change email address.
                            </Form.Text>
                        </Form.Group>
                    </fieldset>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>About you</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                        <Form.Text className="text-muted">
                            Hint: Your schooling, collage, Native place, hobbies, intrests etc.
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Add your skills</Form.Label>&nbsp;&nbsp;
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="add skills one-by-one.."
                                aria-label="add skills one-by-one.."
                                aria-describedby="basic-addon2"
                                id="tagField"
                            />
                            <InputGroup.Append>
                                <Button type='submit' onClick={(e) => { e.preventDefault()}} variant="outline-primary" style={{ padding: '5px 20px' }}>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    {/* {
                        skills.map(skill => (
                            <Badge key={skill} style={{ marginRight: '10px', fontSize: '14px' }} pill variant="outline-dark">
                                <AiFillCloseCircle style={{ cursor: 'pointer' }} title='onClick delete tag' onClick={() => delTag(tag)} />&nbsp;{skill}
                            </Badge>
                        ))
                    } */}
                    <br />
                    <Form.Label>Link Social media</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} md={6} sm={12} controlId="formGridCity">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}><AiFillTwitterCircle /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="enter twitter username"
                                    aria-label="Twitter"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6} sm={12} controlId="formGridCity">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}><AiFillFacebook /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="enter facebook username"
                                    aria-label="facebook"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6} sm={12} controlId="formGridCity">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}><AiFillInstagram /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="enter Instagram username"
                                    aria-label="Instagram"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6} sm={12} controlId="formGridCity">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}><AiFillLinkedin /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="enter Linked-in username"
                                    aria-label="enter Linked-in username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Button onClick={() => props.HEdit(false)} className="editbtn">save changes</Button><br />
                </Form>
            </Col>
        </Row>
    )
}

export default EditProfile
