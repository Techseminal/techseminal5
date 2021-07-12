import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';

const ModalProfiles = ({show,closeModal,title, profiles }) => {
    return (
        <Modal
        show={show}
        onHide={closeModal}
        centered
        >
            <section className="modal-body" style={{ maxWidth: '500px' }}>
                <AiFillCloseCircle style={{ fontSize: '20px', cursor: 'pointer',position:'absolute', right: '15px' }} onClick={closeModal} />
                <center><strong style={{textTransform:'capitalize', textAlign:'center'}}>{title}</strong></center>
                <hr />
                {
                    profiles.length === 0 ? <h6 style={{ color: 'grey', marginTop: '50px', textAlign: 'center' }}>YOU DIDN'T ADDED ANYONE YET!</h6> : profiles.map(profile => {
                        return <div key={profile.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={profile.profileImg} alt="profile" style={{ borderRadius: '50px', marginRight: '10px', height: '42px', width: '42px' }} />
                                <div style={{ lineHeight: '3px' }}>
                                    <p style={{ fontWeight: '700', fontSize: '14px' }}>{profile.name}</p>
                                    <cite style={{ fontSize: '12px', }}>{profile.mail}</cite>
                                </div>
                            </section>
                            <Button variant="outline-primary" style={{ height: 'fit-content', fontSize: '12px', padding: '3px 10px' }}>Following</Button>
                        </div>
                    })
                }

            </section>
        </Modal>
    );
};

export default ModalProfiles;