import React, { useState, useEffect } from 'react'
import { firestore, signOut } from '../firebase/firebase-utils'
import { Image, Row, Col, Button, Badge } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { AiFillFacebook, AiOutlineInstagram, AiOutlineLogout, AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai'
import Modal from '../components/Modal'

function Section1(props) {
    const [username, setusername] = useState('');
    const [bio, setbio] = useState('');
    const [skills, setskills] = useState([]);
    const [facebook, setfacebook] = useState('');
    const [instagram, setinstagram] = useState('');
    const [twitter, settwitter] = useState('');
    const [linkedin, setlinkedin] = useState('');
    const [followers, setfollowers] = useState([]);
    const [following, setfollowing] = useState([]);
    const [show, setshow] = useState(false);

    const [followersData, setfollowersData] = useState([]);
    const [followingData, setfollowingData] = useState([]);
    useEffect(() => {
        firestore.collection('Users').doc(props.user.uid).onSnapshot(doc => {
            setusername(doc.data().username)
            setbio(doc.data().bio)
            setskills(doc.data().skills)
            setfacebook(doc.data().facebook)
            setinstagram(doc.data().instagram)
            settwitter(doc.data().twitter)
            setlinkedin(doc.data().linkedIn)
            setfollowers(doc.data().followers)
            setfollowing(doc.data().following)
        })
    }, [props.user]);

    useEffect(() => {
        firestore.collection('Users').onSnapshot(querySnapshot => {
            const users = querySnapshot.docs.map(doc => {
                return {
                    name: doc.data().username,
                    mail: doc.data().mail,
                    profileImg: doc.data().profileImgUrl,
                    id: doc.id
                }
            })
            let followerUsers = users.map(user => {
                return followers.find((uid) => uid === user.id) ? user : null
            })
            followerUsers = followerUsers.filter((user) => user !== null)
            setfollowersData(followerUsers)
            let followingUsers = users.map(user => {
                return following.find((uid) => uid === user.id) ? user : null
            })
            followingUsers = followingUsers.filter((user) => user != null)
            setfollowingData(followingUsers)
        })
    }, [followers, following]);

    const [data, setdata] = useState('');

    return (
        <Row className="Section1">
            {show ? <Modal closeModal={() => setshow(false)} profiles={data === 'followers' ? followersData : followingData} /> : null}
            <Col sm={12} md={4} style={{ textAlign: 'center', padding: '0 50px' }}>
                <Image className="photoURL" src={props.user.photoURL} alt="" /><br />
                <Button variant='light' onClick={() => props.HEdit(true)} className="editbtn">Edit profile</Button><br />
                <Button variant="danger" onClick={() => { signOut(); props.history.push('/') }} className="editbtn"><AiOutlineLogout /> logout</Button><br />
            </Col>
            <Col sm={12} md={8}>
                <br />
                <h4>{username}</h4>
                <p style={{ color: 'gray', fontSize: '14px' }}>{props.user.email}</p>
                <div style={{ display: 'flex' }}>
                    <Button variant="outline-primary" onClick={() => { setshow(true); setdata('followers') }} style={{ marginRight: '30px' }}><span style={{ fontSize: '18px', fontWeight: '600' }}>{followers.length}</span> followers</Button>
                    <Button variant="outline-primary" onClick={() => { setshow(true); setdata('following') }}><span style={{ fontSize: '18px', fontWeight: '600' }}>{following.length}</span> following</Button>
                </div>
                <br />
                <p style={{ maxWidth: '400px' }}>
                    <strong>About you</strong><br />
                    <span style={{ fontSize: '18px', color: 'grey' }}>
                        {bio}
                    </span>
                </p>
                <div style={{ maxWidth: '500px', }}>
                    {skills.map(skill => <Badge key={skill} pill className="badge">{skill}</Badge>)}
                </div>
                {twitter === '' && facebook === '' && instagram === '' && linkedin === '' ? null : <div style={{ margin: '20px 0' }}>
                    Social Media:&nbsp;
                    {twitter === '' ? null : <a href={'https://www.twitter.com/' + twitter} target="_blank" rel="noreferrer"><i><AiOutlineTwitter /></i></a>}
                    {facebook === '' ? null : <a href={'https://www.facebook.com/' + facebook} target="_blank" rel="noreferrer"><i><AiFillFacebook /></i></a>}
                    {instagram === '' ? null : <a href={'https://www.instagram.com/' + instagram} target="_blank" rel="noreferrer"><i><AiOutlineInstagram /></i></a>}
                    {linkedin === '' ? null : <a href={'https://www.linkedin.com/in/' + linkedin} target="_blank" rel="noreferrer"><i><AiOutlineLinkedin /></i></a>}
                </div>}
            </Col>
        </Row>
    )
}

export default withRouter(Section1)
