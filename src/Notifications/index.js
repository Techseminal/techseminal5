import React from 'react'
import { Container, Image, Button, Alert } from 'react-bootstrap'
import './Notifications.scss'
import Navbar from '../ExplorePage/Navbar'
import Loader from '../components/Loader'
import { FaBell } from 'react-icons/fa'
import { MdAnnouncement } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

function Notifications(props) {
    return (
        props.user ?
            <>
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
                    {/* Info/message/announcement */}
                    <Alert variant="warning">
                        <h6><MdAnnouncement /> Message</h6>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap'}}>
                            <h6>Please setup your profile and get discovered by visitors. </h6>
                            <Button variant="outline-dark">click me</Button>
                        </div>
                    </Alert>
                    {/* Team requests */}
                    <Alert variant="primary">
                        <p><RiTeamFill /> Team Request from <span style={{ fontWeight: '700' }}>{props.user.displayName}</span></p>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap'}}>
                            <p>I am very much intredted in this idea. I had done masters in Information Technology. We can work togather to make it possible.</p>
                            <div className="Actions">
                                <Button variant="outline-success">Accept</Button>
                                <Button variant="outline-danger">Reject</Button>
                            </div>
                        </div>
                    </Alert>
                    {/* Post Blog Notifier */}
                    <Alert variant="info">
                        <p><Image style={{height:'24px',width:'24px',borderRadius:'50%'}} src={props.user.photoURL} /> <span style={{ fontWeight: '700' }}>{props.user.displayName}</span> uploaded new post</p>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap'}}>
                            <h6>Batteries with USB ports to charge them. Gotta love technology!</h6>
                            <Button variant="outline-dark">View post</Button>
                        </div>
                    </Alert>
                </Container>
            </>
            :
            <Loader />

    )
}

export default Notifications
