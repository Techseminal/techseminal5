import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Alert } from 'react-bootstrap'
import './Notifications.scss'
import Navbar from '../ExplorePage/Navbar'
import Loader from '../components/Loader'
import DisplayProfile from '../components/DisplayProfile'
import { FaBell } from 'react-icons/fa'
import { MdAnnouncement } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import firebase, { firestore } from '../firebase/firebase-utils'

function Notifications(props) {
    const [notifications, setnotifications] = useState([]);

    useEffect(() => {
        if (props.user) {
            firestore.collection('Users').doc(props.user.uid).onSnapshot(user => {
                setnotifications(user.data().notifications)
            })
        }
    }, [props.user]);

    const teamRequestHandler = (uid, timestamp, blog, accept) => {
        let filtered = notifications.filter(notification => notification.timestamp !== timestamp)
        firestore.collection('Users').doc(props.user.uid).update({
            'notifications': filtered
        })
        if (accept) {
            firestore.collection('Blogs').doc(blog).update({
                'members': firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }
    }

    const [modal, setmodal] = useState(false);
    return (
        props.user ?
            <>
                <DisplayProfile show={modal}/>
                <Navbar user={props.user} />
                <Container style={{ padding: '100px 10px' }}>
                    <div className="status-display">
                        <Image src={props.user.photoURL} alt="" />
                        <Image src={props.user.photoURL} alt="" />
                        <Image src={props.user.photoURL} alt="" />
                    </div>
                    <div className="Header">
                        <h4 style={{ color: 'tomato' }}><FaBell /> &nbsp;<span style={{ fontSize: '18px' }}>Notifications</span></h4>
                        <Button variant="light">Mark as read</Button>
                    </div>
                    <br />
                    {notifications.sort((a, b) => b.timestamp - a.timestamp).map(notification => {
                        // TEAM REQUESTS
                        if (notification.type === 'team request') {
                            return <Alert variant="primary">
                                <p><RiTeamFill /> Team Request from <span style={{ fontWeight: '700', cursor:'pointer' }}>{notification.username}</span></p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <p>{notification.message}</p>
                                    <div className="Actions">
                                        <Button variant="outline-success" onClick={() => teamRequestHandler(notification.uid, notification.timestamp, notification.blog, true)}>Accept</Button>
                                        <Button variant="outline-danger" onClick={() => teamRequestHandler(notification.uid, notification.timestamp, notification.blog, false)}>Reject</Button>
                                    </div>
                                </div>
                            </Alert>
                        }
                        // BLOG NOTIFIERS
                        if (notification.type === 'blog notifier') {
                            return <Alert variant="info">
                                <p><Image style={{ height: '24px', width: '24px', borderRadius: '50%' }} src={props.user.photoURL} /> <span style={{ fontWeight: '700' }}>{props.user.displayName}</span> uploaded new post</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <h6>Batteries with USB ports to charge them. Gotta love technology!</h6>
                                    <Button variant="outline-dark">View post</Button>
                                </div>
                            </Alert>
                        }
                        // ANNOUNCEMENTS
                        else {
                            return <Alert variant="warning">
                                <h6><MdAnnouncement /> Message</h6>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <h6>Please setup your profile and get discovered by visitors. </h6>
                                    <Button variant="outline-dark">click me</Button>
                                </div>
                            </Alert>
                        }
                    })}
                </Container>
            </>
            :
            <Loader />

    )
}

export default Notifications
