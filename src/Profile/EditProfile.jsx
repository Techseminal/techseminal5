import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Button, Alert, Form, InputGroup, FormControl, Badge } from 'react-bootstrap'
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle, AiFillCloseCircle } from 'react-icons/ai'
import { firestore } from '../firebase/firebase-utils';

function EditProfile(props) {
    const [namesDB, setnamesDB] = useState([]);
    const [error, seterror] = useState(false);
    const [username, setusername] = useState('');
    const [nickname, setnickname] = useState('');
    const [bio, setbio] = useState('');
    const [skills, setskills] = useState([]);
    const [facebook, setfacebook] = useState('');
    const [instagram, setinstagram] = useState('');
    const [twitter, settwitter] = useState('');
    const [linkedin, setlinkedin] = useState('');
    useEffect(() => {
        let existingName = '';
        firestore.collection('Users').doc(props.user.uid).onSnapshot(user => {
            setusername(user.data().username)
            setnickname(user.data().nickname)
            setbio(user.data().bio)
            setskills(user.data().skills)
            setfacebook(user.data().facebook)
            setinstagram(user.data().instagram)
            settwitter(user.data().twitter)
            setlinkedin(user.data().linkedIn)

            existingName = user.data().username;
        })

        firestore.collection('Users').onSnapshot(querySnapshot => {
            let usernames = querySnapshot.docs.map(doc => doc.data().username)
            usernames = usernames.filter(name => name !== existingName)
            setnamesDB(usernames);
        })
        // eslint-disable-next-line
    }, []);

    function usernameHandler(value) {
        setusername(value)
        if (namesDB.find(name => name.replace(/\s/g, "") === value.replace(/\s/g, ""))) {
            seterror(true)
        }
        else {
            seterror(false)
        }
    }

    function addSkill(e) {
        e.preventDefault();
        setskills([...skills, document.getElementById('skills').value])
        document.getElementById('skills').value = ''
    }

    function saveProfile() {
        if (username === '' || error === true || nickname === '') {
            alert('Please fill the proper details!')
        }
        else {
            firestore.collection('Users').doc(props.user.uid).update({
                'username': username,
                'nickname': nickname,
                'bio': bio,
                'skills': skills,
                'facebook': facebook,
                'instagram': instagram,
                'twitter': twitter,
                'linkedIn': linkedin,
            })
            props.HEdit(false)
        }
    }
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
                        <Form.Control type="text" value={username} onChange={(e) => usernameHandler(e.target.value)} placeholder="enter unique usename" />
                        <Form.Text style={{ color: error ? 'red' : 'black' }}>
                            {error ? 'Username already exists' : 'Help people discover your account by using your usename'}
                        </Form.Text>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control type="text" value={nickname} onChange={(e) => setnickname(e.target.value)} placeholder="enter nickname"/>
                        <Form.Text>choose a name to display on your account</Form.Text>
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
                        <Form.Control as="textarea" rows={3} value={bio} onChange={(e) => setbio(e.target.value)} />
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
                                id="skills"
                            />
                            <InputGroup.Append>
                                <Button type='submit' onClick={(e) => addSkill(e)} variant="outline-primary" style={{ padding: '5px 20px' }}>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    {
                        skills.map(skill => (
                            <Badge key={skill} style={{ marginRight: '10px', fontSize: '14px' }} pill variant="outline-dark" onClick={() => setskills(skills.filter(Skill => Skill !== skill))}>
                                <AiFillCloseCircle style={{ cursor: 'pointer' }} title='onClick delete skill' />&nbsp;{skill}
                            </Badge>
                        ))
                    }
                    <br /><br />
                    <Form.Label>Link Social media</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} md={6} sm={12} controlId="formGridCity">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}><AiFillTwitterCircle /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    value={twitter}
                                    onChange={(e) => settwitter(e.target.value)}
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
                                    value={facebook}
                                    onChange={(e) => setfacebook(e.target.value)}
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
                                    value={instagram}
                                    onChange={(e) => setinstagram(e.target.value)}
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
                                    value={linkedin}
                                    onChange={(e) => setlinkedin(e.target.value)}
                                    placeholder="enter Linked-in username"
                                    aria-label="enter Linked-in username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Button onClick={saveProfile} className="editbtn">save changes</Button><br />
                </Form>
            </Col>
        </Row>
    )
}

export default EditProfile
