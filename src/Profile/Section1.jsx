import React from 'react'
import { signOut } from '../firebase/firebase-utils'
import { Image, Row, Col, Button, Badge } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { AiFillFacebook, AiOutlineInstagram, AiOutlineLogout, AiOutlineTwitter } from 'react-icons/ai'

function Section1(props) {
    return (
        <Row className="Section1">
            <Col sm={12} md={4} style={{ textAlign: 'center', padding: '0 50px' }}>
                <Image className="photoURL" src={props.user.photoURL} alt="" /><br />
                <Button variant='light' onClick={() => props.HEdit(true)} className="editbtn">Edit profile</Button><br />
                <Button variant="danger" onClick={() => { signOut(); props.history.push('/') }} className="editbtn"><AiOutlineLogout /> logout</Button><br/>
            </Col>
            <Col sm={12} md={8}>
                <br />
                <h4>{props.user.displayName}</h4>
                <p style={{ color: 'gray', fontSize: '14px' }}>{props.user.email}</p>
                <div style={{ display: 'flex' }}>
                    <Button variant="outline-primary" style={{ marginRight: '30px' }}><span style={{ fontSize: '18px', fontWeight: '600' }}>10</span> followers</Button>
                    <Button variant="outline-primary"><span style={{ fontSize: '18px', fontWeight: '600' }}>24</span> following</Button>
                </div>
                <br />
                <p style={{ maxWidth: '400px' }}>
                    <strong>About you</strong><br />
                    <span style={{ fontSize: '14px', color: 'gray' }}>
                        I am studying at RGUKT IIIT Srikakulam.
                        I completed my schooling in Guntur, AP.
                        At present I am living in Nuzvid. I am a CSE student and very well known for website development.
                        I have deveploed so many websites. I am very much intrested in knowing different kinds of frame works regarding front-end development.
                    </span>
                </p>
                <div style={{ maxWidth: '500px', }}>
                    <Badge pill className="badge">Front-End Developer</Badge>
                    <Badge pill className="badge">React js</Badge>
                    <Badge pill className="badge">Bootstrap</Badge>
                    <Badge pill className="badge">Firebase</Badge>
                    <Badge pill className="badge">Vue js</Badge>
                </div>
                <div style={{ margin: '20px 0' }}>
                    Social Media:&nbsp;
                    <i><AiOutlineTwitter /></i>
                    <i><AiFillFacebook /></i>
                    <i><AiOutlineInstagram /></i>
                </div>
            </Col>
        </Row>
    )
}

export default withRouter(Section1)
