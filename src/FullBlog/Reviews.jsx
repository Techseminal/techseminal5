import React, { useState, useEffect } from 'react'
import firebase, { firestore, signInWithGoogle } from '../firebase/firebase-utils'
import { Button } from 'react-bootstrap'

function RepliesModel() {
    return (
        <div className="RepliesSection">
            <p>
                <strong>user123</strong>
                &nbsp;&nbsp;
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis.
                &nbsp;&nbsp;
                <span>reply</span>
            </p>
            <p>
                <strong>user123</strong>
                &nbsp;&nbsp;
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis.
                &nbsp;&nbsp;
                <span>reply</span>
            </p>
        </div>
    )
}

function CommentModel(props) {
    const [show, setshow] = useState(false);
    return (
        <>
            <div className="UserAvatar" style={{ color: props.theme }}>
                <img src={props.profile} alt="" height="24px" />
                <div>
                    <strong>{props.username}</strong>
                    <p><cite>{props.time}</cite></p>
                </div>
            </div>
            <p className="CommentText">{props.comment}</p>
            <div className="CommentActions">
                <p>
                    <span>{3} likes</span>
                    <span onClick={() => setshow(!show)}>{10} replies</span>
                </p>
            </div>
            {show ? <div className="Allreplies" style={{ height: 'auto', overflowY: 'auto' }}>
                <RepliesModel />
            </div> : null}
        </>
    )
}

function Reviews(props) {
    const [Comment, setComment] = useState('');
    const [comments, setcomments] = useState([]);
    const [username, setusername] = useState('');
    useEffect(() => {
        firestore.collection('Blogs').doc(props.id).onSnapshot(blog => {
            setcomments(blog.data().comments)
        })
        if (props.user)
            firestore.collection('Users').doc(props.user.uid).onSnapshot(user => {
                setusername(user.data().username)
            })
    }, [props.id, props.user]);
    const handleClick = (e) => {
        e.preventDefault();
        if (Comment !== '') {
            firestore.collection('Blogs').doc(props.id).update({
                'comments': firebase.firestore.FieldValue.arrayUnion({
                    'username': username,
                    'comment': Comment,
                    'time': new Date().toString(),
                    'profile': props.user.photoURL
                })
            })
            setComment('')
        }

    }
    return (
        <div className="Reviews">
            <h5>Comments</h5>
            {
                props.user ?
                    <form className="PostReviewField">
                        <input id="commentField" value={Comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder='leave your comment...' className="commentField" />
                        <Button type='submit' onClick={handleClick} className="sendBtn" variant="light" style={{ color: props.theme }}>send</Button>
                    </form> : <Button onClick={signInWithGoogle}>SignIn to post reviews</Button>
            }
            <div className="AllComments">
                {comments.map(comment => <CommentModel username={comment.username} comment={comment.comment} time={comment.time} profile={comment.profile} />)}
            </div>
        </div>
    )
}

export default Reviews
