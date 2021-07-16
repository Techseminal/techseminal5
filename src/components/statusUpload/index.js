import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Modal } from 'react-bootstrap'
import ImageStatus from './ImageStatus';
import PollStatus from './PollStatus'
import MessageStatus from './MessageStatus.jsx'

function Status({ show, closeModal, status }) {

    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered
        >
            <section className="modal-body" style={{ maxWidth: '500px' }}>
                <AiFillCloseCircle style={{ fontSize: '20px', cursor: 'pointer', position: 'absolute', right: '15px' }} onClick={closeModal} />
                <br />
                {
                    status === 'Picture' ? <ImageStatus type={status} />
                        : status === 'Poll' ? <PollStatus type={status} />
                            : status === 'Message' ? <MessageStatus type={status} />
                                : null
                }
            </section>
        </Modal>
    )
}

export default Status
