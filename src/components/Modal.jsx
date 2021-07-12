import React, { useState } from 'react';
import firebase, { firestore } from '../firebase/firebase-utils'
import { Button, Modal } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import DisplayProfile from './DisplayProfile'

const ModalProfiles = ({ show, closeModal, title, profiles, following, uid }) => {
    const followHandler = (profileId) => {
        if (following.find((uid) => uid === profileId)) {
            firestore.collection('Users').doc(uid).update({
                'following': firebase.firestore.FieldValue.arrayRemove(profileId)
            })
            firestore.collection('Users').doc(profileId).update({
                'followers': firebase.firestore.FieldValue.arrayRemove(uid)
            })
        }
        else {
            firestore.collection('Users').doc(uid).update({
                'following': firebase.firestore.FieldValue.arrayUnion(profileId)
            })
            firestore.collection('Users').doc(profileId).update({
                'followers': firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }
    }

    const [modal, setmodal] = useState(false);

    const [profileID, setprofileID] = useState(null);

    const viewProfile = (id) => {
        setprofileID(id)
        setmodal(true)
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered
        >
            {profileID ? <DisplayProfile show={modal} closeModal={() => setmodal(false)} uid={profileID} /> : null}
            <section className="modal-body" style={{ maxWidth: '500px' }}>
                <AiFillCloseCircle style={{ fontSize: '20px', cursor: 'pointer', position: 'absolute', right: '15px' }} onClick={closeModal} />
                <center><strong style={{ textTransform: 'capitalize', textAlign: 'center' }}>{title}</strong></center>
                <hr />
                {
                    profiles.length === 0 ? <h6 style={{ color: 'grey', marginTop: '50px', textAlign: 'center' }}>YOU DIDN'T ADDED ANYONE YET!</h6> : profiles.map(profile => {
                        return <div key={profile.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={profile.profileImg} alt="profile" style={{ borderRadius: '50px', marginRight: '10px', height: '42px', width: '42px' }} />
                                <div style={{ lineHeight: '3px' }}>
                                    <p onClick={() => viewProfile(profile.id)} style={{ cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>{profile.name}</p>
                                    <cite style={{ fontSize: '12px', }}>{profile.mail}</cite>
                                </div>
                            </section>
                            <Button onClick={() => followHandler(profile.id)} variant={following.find((uid) => uid === profile.id) ? 'primary' : 'outline-primary'} style={{ height: 'fit-content', fontSize: '12px', padding: '3px 10px' }}>{following.find((uid) => uid === profile.id) ? 'Following' : 'Follow'}</Button>
                        </div>
                    })
                }

            </section>
        </Modal>
    );
};

export default ModalProfiles;