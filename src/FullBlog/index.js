import React, { useEffect, useState } from 'react'
import { firestore, signInWithGoogle } from '../firebase/firebase-utils'
import { withRouter } from 'react-router'
import { Container, Image, Row, Button, Card, Badge } from 'react-bootstrap'
import { usePalette } from 'react-palette'
import { AiOutlineStar, AiOutlineSave, AiOutlineShareAlt, AiFillFacebook, AiOutlineTwitter, AiFillStar, AiFillSave, AiOutlineSend, AiFillLinkedin, AiFillInstagram, AiFillMail, AiOutlineTeam } from 'react-icons/ai'

import './FullBlog.scss'

function FullPortray(props) {
    // Current Blog data
    const portrayId = props.match.params.id;
    const [Title, setTitle] = useState('');
    const [discrp, setdiscrp] = useState('');
    const [author, setauthor] = useState('');
    const [image, setimage] = useState('');
    const [stars, setstars] = useState([]);
    const [notifications, setnotifications] = useState([]);
    const [tags, setTags] = useState([]);
    // Author data
    const [UID, setUID] = useState('');
    const [Mail, setMail] = useState('');
    const [Facebook, setFacebook] = useState('');
    const [Instagram, setInstagram] = useState('');
    const [Twitter, setTwitter] = useState('');
    const [LinkedIn, setLinkedIn] = useState('');
    // current Blog data
    useEffect(() => {
        firestore.collection('Blogs').doc(portrayId).onSnapshot(doc => {
            setTitle(doc.data().title)
            setdiscrp(doc.data().discrp)
            setimage(doc.data().image)
            setauthor(doc.data().author)
            setUID(doc.data().userUID)
            setstars(doc.data().stars)
            setTags(doc.data().tags)
            const notificationsData = doc.data().notifications.map((notification) => {
                return {
                    'uid': notification['uid'],
                    'message': notification['message']
                }
            })
            setnotifications(notificationsData)
        })
    }, [portrayId]);
    // Author data
    useEffect(() => {
        if (UID !== '') {
            firestore.collection('Users').doc(UID).onSnapshot(doc => {
                setMail(doc.data().mail)
                setFacebook(doc.data().facebook)
                setInstagram(doc.data().instagram)
                setTwitter(doc.data().twitter)
                setLinkedIn(doc.data().linkedIn)
            })
        }
    }, [UID]);
    // eslint-disable-next-line
    const { data, loading, error } = usePalette(image)

    function starsHandler() {
        if (!stars.find((uid) => uid === props.user.uid)) {
            stars.push(props.user.uid)
        }
        else {
            stars.pop(props.user.uid)
        }
        firestore.collection('Blogs').doc(portrayId).update({
            'stars': stars
        })
    }

    function savedHandler() {
        if (!props.saved.find((postID) => postID === portrayId)) {
            props.saved.push(portrayId)
        }
        else {
            props.saved.pop(portrayId)
        }
        firestore.collection('Users').doc(props.user.uid).update({
            'saved': props.saved
        })
    }

    function teamRequestHandler() {
        notifications.push({
            'uid': props.user.uid,
            'message': 'I want to join with you'
        })
        firestore.collection('Blogs').doc(portrayId).update({
            'notifications': notifications
        })
    }

    return (
        <>
            <Row className="FullBlog">
                <Container>
                    {/* Header Section */}
                    <header>
                        <div className="UserAvatar" style={{ color: data.vibrant }}>
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" height="24px" />
                            <div>
                                <strong>{author}</strong>
                                <p>Posted on <cite>22nd May 2021</cite></p>
                            </div>
                        </div>
                        <div className="Actions">
                            <Button variant="light" style={{ color: data.vibrant }} onClick={props.user ? starsHandler : signInWithGoogle}>
                                {props.user ? stars.find((uid) => uid === props.user.uid) ? <div><AiFillStar />&nbsp;&nbsp;{stars.length}</div> : <div><AiOutlineStar />&nbsp;&nbsp;Star</div> : <div><AiOutlineStar />&nbsp;&nbsp;Star</div>}
                            </Button>
                            <Button variant="light" style={{ color: data.vibrant }} onClick={props.user ? savedHandler : signInWithGoogle}>{props.saved.find((postID) => postID === portrayId) ? <AiFillSave /> : <AiOutlineSave />}</Button>
                            <Button variant="light" style={{ color: data.vibrant }}><AiOutlineShareAlt /></Button>
                        </div>
                    </header>

                    {/* Article Section */}
                    <article>
                        <Image fluid className="CoverPhoto" src={image} alt="" />
                        <p className="Title"><u>{Title}</u></p>
                        <div dangerouslySetInnerHTML={{__html: discrp}} />
                        {tags.map(tag => (
                            <Badge key={tag} variant="light" style={{ color: data.vibrant, fontSize:'16px', marginRight:'10px' }}>{tag}</Badge>
                        ))}
                    </article>
                    <br />
                    <Button variant="light" className="TeamRequestBtn" style={{ border: `1px solid ${data.vibrant}` }} title="Send team request" onClick={props.user ? notifications.find((notification) => notification['uid'] === props.user.uid) ? null : teamRequestHandler : signInWithGoogle}>
                        {props.user ? notifications.find((notification) => notification['uid'] === props.user.uid) ?
                            <div><AiOutlineSend style={{ color: data.vibrant }} />&nbsp;&nbsp;Requested</div>
                            : <div><AiOutlineTeam style={{ color: data.vibrant }} />&nbsp;&nbsp;Team request</div>
                            : <div><AiOutlineTeam style={{ color: data.vibrant }} />&nbsp;&nbsp;Team request</div>}
                    </Button>
                    <br />
                    {/* Donate section  */}
                    <Card className="Donate">
                        <Card.Body>
                            <p><cite>Loved his work?</cite> <strong style={{ color: data.vibrant }}>Donate now... 😇</strong></p>
                            <div>
                                <Button className="Googlepay">Google pay</Button>
                                <Button className="Phonepe">Phonepe</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="Divider">
                        <hr style={{ height: '1px', backgroundColor: data.vibrant, borderRadius: '25px' }} />
                        <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" />
                    </div>
                    <div className="SocialMedia">
                        <p>Follow <strong style={{ color: data.vibrant }}>{author}</strong> on</p>
                        <div>
                            <a href={Facebook} target="_blank" rel="noreferrer"><Button variant="light" title="Facebook"><AiFillFacebook style={{ color: data.vibrant }} /></Button></a>
                            <a href={Twitter} target="_blank" rel="noreferrer"><Button variant="light" title="Twitter"><AiOutlineTwitter style={{ color: data.vibrant }} /></Button></a>
                            <a href={Instagram} target="_blank" rel="noreferrer"><Button variant="light" title="Instagram"><AiFillInstagram style={{ color: data.vibrant }} /></Button></a>
                            <a href={LinkedIn} target="_blank" rel="noreferrer"><Button variant="light" title="Linked-in"><AiFillLinkedin style={{ color: data.vibrant }} /></Button></a>
                            <a href={"mailto:" + Mail}><Button variant="light" title="Mail"><AiFillMail style={{ color: data.vibrant }} /></Button></a>
                        </div>
                    </div>
                </Container>
            </Row>
        </>
    )
}

export default withRouter(FullPortray);
