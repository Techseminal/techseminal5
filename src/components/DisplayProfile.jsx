import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { firestore } from '../firebase/firebase-utils'
import { useState, useEffect } from 'react'
import { Badge, Button, Modal } from 'react-bootstrap'
import { AiOutlineTwitter, AiOutlineInstagram, AiFillFacebook, AiOutlineLinkedin } from 'react-icons/ai'

function DisplayProfile({ show, closeModal, uid }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        firestore.collection('Users').doc(uid).get().then((doc) => {
            setUser(doc.data())
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [uid])

    return (
        show && user ?
            <Modal
                show={show}
                onHide={closeModal}
                centered
            >
                <section className="modal-body" style={{ maxWidth: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h6 style={{ textTransform: 'capitalize' }}>{user.username}</h6>
                        <AiFillCloseCircle onClick={closeModal} style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </div>
                    <hr />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '14px', textAlign: 'center' }}>
                        <img src={user.profileImgUrl} alt="" style={{ marginBottom: '20px', height: '120px', width: '120px', borderRadius: '50%', backgroundColor: '#fff', padding: '3px', border: '2px solid #40A9FF', cursor: 'pointer' }} />
                        <h5 style={{ lineHeight: '5px' }}>{user.nickname === "" ? user.username : user.nickname}</h5>
                        <cite style={{ color: 'gray' }}>{user.mail}</cite>
                        <br />
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                            <p style={{ color: '#40A9FF', margin: '0 10px', paddingBottom: '10px', borderBottom: '2px solid #eff6fde0', width: '100%', textAlign: 'center' }}><span style={{ fontSize: '20px' }}>{user.followers.length}</span> followers</p>
                            <p style={{ color: '#40A9FF', margin: '0 10px', paddingBottom: '10px', borderBottom: '2px solid #eff6fde0', width: '100%', textAlign: 'center' }}><span style={{ fontSize: '20px' }}>{user.following.length}</span> following</p>
                        </div>
                        <p style={{ width: '100%', borderRadius: '10px', padding: '10px', margin: '20px', backgroundColor: '#eff6fde0' }}>
                            <strong style={{ lineHeight: '30px' }}>About</strong><br />
                            {user.bio}<br />
                            {user.skills.map(skill => <Badge key={skill} variant="primary" style={{ margin: '0 2px' }} pill>{skill}</Badge>)}
                        </p>
                        {user.twitter === '' && user.facebook === '' && user.instagram === '' && user.linkedin === '' ? null : <div style={{ margin: '30px 0', fontSize: '20px' }}>
                            {user.twitter === '' ? null : <Button as="a" style={{ margin: '0 10px', color: '#40A9FF' }} variant='light' href={'https://www.twitter.com/' + user.twitter} target="_blank" rel="noreferrer"><i><AiOutlineTwitter /></i></Button>}
                            {user.facebook === '' ? null : <Button as="a" style={{ margin: '0 10px', color: '#40A9FF' }} variant='light' href={'https://www.facebook.com/' + user.facebook} target="_blank" rel="noreferrer"><i><AiFillFacebook /></i></Button>}
                            {user.instagram === '' ? null : <Button as="a" style={{ margin: '0 10px', color: '#40A9FF' }} variant='light' href={'https://www.instagram.com/' + user.instagram} target="_blank" rel="noreferrer"><i><AiOutlineInstagram /></i></Button>}
                            {user.linkedin === '' ? null : <Button as="a" style={{ margin: '0 10px', color: '#40A9FF' }} variant='light' href={'https://www.linkedin.com/in/' + user.linkedin} target="_blank" rel="noreferrer"><i><AiOutlineLinkedin /></i></Button>}
                        </div>}
                        <hr style={{ width: '100%' }}></hr>
                        <Button variant="light" style={{ backgroundColor: '#fff', marginTop: '-36px' }}>view posts</Button>
                    </div>
                </section>
            </Modal>
            : null
    )
}

export default DisplayProfile