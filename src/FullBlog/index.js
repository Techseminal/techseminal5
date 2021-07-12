import React, { useEffect, useState } from 'react'
import firebase, { firestore, signInWithGoogle } from '../firebase/firebase-utils'
import { withRouter } from 'react-router'
import { Container, Image, Row, Button, Card, Badge } from 'react-bootstrap'
import { usePalette } from 'react-palette'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineStar, AiOutlineSave, AiOutlineGoogle, AiOutlineShareAlt, AiFillFacebook, AiOutlineTwitter, AiFillStar, AiFillSave, AiOutlineSend, AiFillLinkedin, AiFillInstagram, AiFillMail, AiOutlineTeam } from 'react-icons/ai'
import Loader from '../components/Loader'
import './FullBlog.scss'
import StepProgressBar from '../components/StepProgressBar'
import Reviews from './Reviews'

function FullPortray(props) {
    // Loader
    const [loader, setLoader] = useState(false)
    // Current Blog data
    const portrayId = props.match.params.id;
    const [Title, setTitle] = useState('');
    const [discrp, setdiscrp] = useState('');
    const [image, setimage] = useState('');
    const [timestamp, settimestamp] = useState(null);
    const [author, setauthor] = useState('');
    const [stars, setstars] = useState([]);
    const [notifications, setnotifications] = useState([]);
    const [tags, setTags] = useState([]);
    const [UID, setUID] = useState('');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Author data
    const [Mail, setMail] = useState('');
    const [payment, setpayment] = useState({});
    const [Facebook, setFacebook] = useState('');
    const [Instagram, setInstagram] = useState('');
    const [Twitter, setTwitter] = useState('');
    const [LinkedIn, setLinkedIn] = useState('');
    const [followers, setfollowers] = useState([]);
    // current Blog data
    useEffect(() => {
        setLoader(true)
        firestore.collection('Blogs').doc(portrayId).onSnapshot(doc => {
            setTitle(doc.data().title)
            setdiscrp(doc.data().discrp)
            setimage(doc.data().image)
            settimestamp(new Date(doc.data().timestamp))
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
            setLoader(false)
        })
    }, [portrayId]);
    // Author data
    useEffect(() => {
        if (UID !== '') {
            firestore.collection('Users').doc(UID).onSnapshot(doc => {
                setMail(doc.data().mail)
                setpayment(doc.data().payment)
                setFacebook(doc.data().facebook)
                setInstagram(doc.data().instagram)
                setTwitter(doc.data().twitter)
                setLinkedIn(doc.data().linkedIn)
                setfollowers(doc.data().followers)
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

    function shareHandler() {
        if (navigator.share) {
            navigator.share({
                title: Title,
                url: 'https://www.techseminal.org/' + portrayId
            })
        }
    }

    function followHandler() {
        if (followers.find((uid) => uid === props.user.uid)) {
            firestore.collection('Users').doc(props.user.uid).update({
                'following': firebase.firestore.FieldValue.arrayRemove(UID)
            })
            firestore.collection('Users').doc(UID).update({
                'followers': firebase.firestore.FieldValue.arrayRemove(props.user.uid)
            })
        }
        else {
            firestore.collection('Users').doc(props.user.uid).update({
                'following': firebase.firestore.FieldValue.arrayUnion(UID)
            })
            firestore.collection('Users').doc(UID).update({
                'followers': firebase.firestore.FieldValue.arrayUnion(props.user.uid)
            })
        }
    }


    return (
        <>
            <Row className="FullBlog">
                {
                    loader ? <Loader /> : null
                }
                <Container>
                    {/* Header Section */}
                    <header>
                        <div className="UserAvatar" style={{ color: data.vibrant }}>
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" height="24px" />
                            <div>
                                <strong style={{cursor:'pointer'}}>{author} &nbsp;
                                    {props.user ?
                                        props.user.uid === UID ? null : followers.find((uid) => uid === props.user.uid) ? <Badge variant='primary' style={{fontWeight:'500', fontSize:'12px'}} onClick={followHandler}>Following</Badge> : <Badge variant='secondary' style={{fontWeight:'500', fontSize:'12px'}} onClick={followHandler}>Follow</Badge>
                                        : <Badge variant='primary' style={{fontWeight:'500', fontSize:'12px'}} onClick={signInWithGoogle}>Follow</Badge>}
                                </strong>
                                {timestamp ? <p>Posted on <cite>{timestamp.getDate()}&nbsp;{months[timestamp.getMonth()]}&nbsp;{timestamp.getFullYear()}</cite></p> : null}
                            </div>
                        </div>
                        <div className="Actions">
                            <Button variant="light" style={{ color: data.vibrant }} onClick={props.user ? starsHandler : signInWithGoogle}>
                                <div>{props.user ? stars.find((uid) => uid === props.user.uid) ? <AiFillStar /> : <AiOutlineStar /> : <AiOutlineStar />}&nbsp;&nbsp;{stars.length}</div>
                            </Button>
                            <Button variant="light" style={{ color: data.vibrant }} onClick={props.user ? savedHandler : signInWithGoogle}>{props.saved.find((postID) => postID === portrayId) ? <AiFillSave /> : <AiOutlineSave />}</Button>
                            <Button variant="light" style={{ color: data.vibrant }} onClick={shareHandler}><AiOutlineShareAlt /></Button>
                        </div>
                    </header>

                    {/* Article Section */}
                    <article>
                        <Image fluid className="CoverPhoto" src={image} alt="" />
                        <p className="Title"><u>{Title}</u></p>
                        <div dangerouslySetInnerHTML={{ __html: discrp }} />
                        <br />
                        {tags.map(tag => (
                            <Badge key={tag} variant="light" style={{ color: data.vibrant, fontSize: '16px', marginRight: '10px' }}>{tag}</Badge>
                        ))}
                    </article>
                    <br />
                    <Row style={{ margin: '10px 0', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="light" className="TeamRequestBtn" style={{ border: `1px solid ${data.vibrant}` }} title="Send team request" onClick={props.user ? notifications.find((notification) => notification['uid'] === props.user.uid) ? null : teamRequestHandler : signInWithGoogle}>
                            {props.user ? notifications.find((notification) => notification['uid'] === props.user.uid) ?
                                <div><AiOutlineSend style={{ color: data.vibrant }} />&nbsp;&nbsp;Requested</div>
                                : <div><AiOutlineTeam style={{ color: data.vibrant }} />&nbsp;&nbsp;Team request</div>
                                : <div><AiOutlineTeam style={{ color: data.vibrant }} />&nbsp;&nbsp;Team request</div>}
                        </Button>
                    </Row>
                    <div style={{ margin: '100px 10px' }}>
                        <StepProgressBar stage={25} />
                    </div>
                    {/* Donate section  */}
                    <Card className="Donate">
                        <Card.Body>
                            <p><cite>Loved his work?</cite> <strong style={{ color: data.vibrant }}>Donate now... 😇</strong></p>
                            <div>
                                <Button className="Googlepay"><AiOutlineGoogle style={{ fontSize: '25px' }} />&nbsp;{payment.gpay}</Button>
                                <Button className="Phonepe"><span style={{ fontSize: '18px', fontWeight: 'bold' }}>पे</span>&nbsp;&nbsp;{payment.phonepe}</Button>
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
                            <a href={'https://www.facebook.com/' + Facebook} target="_blank" rel="noreferrer"><Button variant="light" title="Facebook"><AiFillFacebook style={{ color: data.vibrant }} /></Button></a>
                            <a href={'https://www.twitter.com/' + Twitter} target="_blank" rel="noreferrer"><Button variant="light" title="Twitter"><AiOutlineTwitter style={{ color: data.vibrant }} /></Button></a>
                            <a href={'https://www.instagram.com/' + Instagram} target="_blank" rel="noreferrer"><Button variant="light" title="Instagram"><AiFillInstagram style={{ color: data.vibrant }} /></Button></a>
                            <a href={'https://www.linkedin.com/in/' + LinkedIn} target="_blank" rel="noreferrer"><Button variant="light" title="Linked-in"><AiFillLinkedin style={{ color: data.vibrant }} /></Button></a>
                            <a href={"mailto:" + Mail}><Button variant="light" title="Mail"><AiFillMail style={{ color: data.vibrant }} /></Button></a>
                        </div>
                    </div>
                    {props.user?.uid === UID ? <Button variant='primary' className="floatingBtn" onClick={() => props.history.push('/editpost?id=' + portrayId)}><BiEdit /></Button> : null}
                    {/* Reviews */}
                    <br />
                    <Reviews user={props.user} theme={data.vibrant} id={portrayId} />
                </Container>
            </Row>
        </>
    )
}

export default withRouter(FullPortray);
