import React, { useState } from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import './Portray.scss'
import firebase, { firestore, signInWithGoogle } from '../../firebase/firebase-utils';
import { withRouter } from "react-router-dom";
import { AiOutlineStar, AiOutlineSave, AiFillStar, AiFillSave, AiOutlineDelete } from 'react-icons/ai'
import { usePalette } from 'react-palette'
import DisplayProfile from '../../components/DisplayProfile';

function PortrayCard(props) {

    const PushId = () => {
        props.history.push('/' + props.id)
        window.scrollTo(0, 0)
    }

    function updateStars(id) {
        if (props.stars.find((uid) => uid === props.user.uid)) {
            firestore.collection('Blogs').doc(id).update({
                'stars': firebase.firestore.FieldValue.arrayRemove(props.user.uid)
            })
        }
        else {
            firestore.collection('Blogs').doc(id).update({
                'stars': firebase.firestore.FieldValue.arrayUnion(props.user.uid)
            })
        }
    }

    function updateSaved(id) {
        if (props.saved.find((postId) => postId === props.id)) {
            firestore.collection('Users').doc(props.user.uid).update({
                'saved': firebase.firestore.FieldValue.arrayRemove(id)
            })
            props.toast('saved')
        }
        else {
            firestore.collection('Users').doc(props.user.uid).update({
                'saved': firebase.firestore.FieldValue.arrayUnion(id)
            })
        }
    }

    function deletePost(id) {
        firestore.collection('Blogs').doc(id).delete()
    }

    // eslint-disable-next-line
    const { data, loading, error } = usePalette(props.img)

    // setting DisplayProfile state
    const [modal, setModal] = useState(false)

    return (
        <>
            <DisplayProfile show={modal} closeModal={() => setModal(false)} uid={props.uid} />
            <Card style={{ borderRadius: '20px', cursor: 'pointer', border: '1px solid #D2EBEE' }} className="PortrayCard">
                <Card.Img style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', width: '100%' }} variant="top" src={props.img} onClick={PushId} />
                <Card.Body>
                    <div>
                        <p className="Title" onClick={PushId}>{props.title}</p>
                        <div className='Tags'>
                            {props.tags.map(tag => (
                                <Badge key={tag} variant="light" style={{ color: data.vibrant }}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <footer>
                        <div className="UserAvatar">
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" style={{ border: `2px solid ${data.vibrant}`, padding: '2px', width: '32px', height: '32px' }} alt="" />
                            <p onClick={() => setModal(true)}>{props.author}</p>
                        </div>
                        <div className="RightSide">
                            <div className="Likes">
                                <Button variant="light" title="give a star" onClick={props.user ? () => updateStars(props.id) : signInWithGoogle}>
                                    <div>{props.user ? props.stars.find((uid) => (uid) === props.user.uid) ? <AiFillStar /> : <AiOutlineStar /> : <AiOutlineStar />}&nbsp;{props.stars.length}</div></Button>
                            </div>
                            &nbsp;
                            <div className="save">
                                <Button variant="light" title="save the post" onClick={props.user ? () => updateSaved(props.id) : signInWithGoogle}>
                                    {props.user ? props.saved.find((postId) => postId === props.id) ? <AiFillSave /> : <AiOutlineSave /> : <AiOutlineSave />}</Button>
                            </div>
                            &nbsp;
                            {props.delete ? <Button title="Delete" variant="light" onClick={() => deletePost(props.id)}><AiOutlineDelete style={{ color: 'red' }} /></Button> : null}
                        </div>
                    </footer>
                </Card.Body>
            </Card>
        </>
    )
}

export default withRouter(PortrayCard);