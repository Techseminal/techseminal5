import React, { useState, useEffect } from 'react'
import firebase, { firestore, signInWithGoogle } from '../firebase/firebase-utils'
import { Button, Accordion } from 'react-bootstrap'
import { AiOutlineHeart, AiOutlineSend, AiFillHeart } from 'react-icons/ai'

function RepliesModel() {
    return (
        <div className="RepliesSection">
            <p>
                <strong>user123 <span>to</span> TechSeminal</strong>
                &nbsp;&nbsp;
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis.
                &nbsp;&nbsp;
                <span style={{cursor:'pointer'}}>reply</span>
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
    const [like, setlike] = useState(false)

    const handleLike = () => {
        setlike(!like)
    }
    return (
        <div className="CommentModal">
            <div className="commentHeader">
                <div className="UserAvatar" style={{ color: props.theme }}>
                    <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" height="24px" />
                    <div>
                        <strong>{props.user.displayName}</strong>
                        <p><cite>{"2d"} ago</cite></p>
                    </div>
                </div>
                <div className="CommentActions">
                    <p onClick={handleLike}>
                        {
                            like ?
                            <AiFillHeart style={{fontSize:'16px', color:'tomato'}} />
                            :<AiOutlineHeart style={{ fontSize: '16px' }} />
                        }
                        &nbsp;{3}
                    </p>
                </div>
            </div>
            <p className="CommentText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque consequatur veritatis maiores explicabo rerum nisi animi laudantium repudiandae debitis consequuntur impedit sed iusto, odit, inventore aspernatur labore placeat ipsa.</p>
            <Accordion>
                <div className="AccordinHeader">
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', maxWidth: '500px', width: '100%', marginBottom: '10px' }}>
                        <AiOutlineSend style={{ color: 'blue' }} />
                        <input style={{}} type="text" placeholder="reply..." />
                    </div>
                    <Accordion.Toggle as='p' style={{ cursor: 'pointer', margin: '10px 0' }} variant="link" eventKey="0">
                        <cite>-- view {10} replies --</cite>
                    </Accordion.Toggle>
                </div>
                <p></p>
                <Accordion.Collapse eventKey="0">
                    <RepliesModel />
                </Accordion.Collapse>
            </Accordion>
            <br />
        </div>
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
