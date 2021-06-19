import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import './Portray.scss'
import firebase from 'firebase'
import { firestore, signInWithGoogle } from '../../firebase/firebase-utils';
import { withRouter } from "react-router-dom";
import { AiOutlineStar, AiOutlineSave, AiFillStar, AiFillSave } from 'react-icons/ai'
import { usePalette } from 'react-palette'

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
        if(props.saved.find((postId) => postId === props.id)) {
            firestore.collection('Users').doc(props.user.uid).update({
                'saved': firebase.firestore.FieldValue.arrayRemove(id)
            })
        }
        else {
            firestore.collection('Users').doc(props.user.uid).update({
                'saved': firebase.firestore.FieldValue.arrayUnion(id)
            }) 
        }
    }

    // eslint-disable-next-line
    const { data, loading, error } = usePalette(props.img)
    return (
        <>
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
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" style={{ border: `2px solid ${data.vibrant}` }} alt="" height="24px" />
                            <p>{props.author}</p>
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
                        </div>
                    </footer>
                </Card.Body>
            </Card>
        </>
    )
}

export default withRouter(PortrayCard);