import React from 'react';
import { Col } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = (props) => {
    return (
        <div className="modal-custom" onClick={props.closeModal}>
            <Col xs={9} lg={4} xl={3} style={{ background: '#fff', color: '#000', minHeight: '350px', borderRadius: '10px' }}>
                <AiOutlineClose onClick={props.closeModal} style={{ float: 'right', cursor: 'pointer', marginTop: '10px', fontSize: '20px' }} />
                {props.profiles.length === 0 ? <h6 style={{color:'grey', marginTop:'70px', textAlign:'center'}}>YOU DIDN'T ADDED ANYONE YET!</h6> : props.profiles.map(profile => {
                    return <div key={profile.name} style={{ display: 'flex', marginTop: '10px', marginBottom:'-30px' }}>
                        <img src={profile.profileImg} alt="profile" style={{ borderRadius: '50px', padding: '10px', margin: '10px' }} width="70px" />
                        <h6 style={{ marginTop: '25px' }}>
                            {profile.name}<br />
                            <small>{profile.mail}</small>
                        </h6>
                    </div>
                })}
            </Col>
        </div>
    );
};

export default Modal;