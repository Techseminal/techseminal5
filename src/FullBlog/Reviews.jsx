import React, { useState, useEffect } from 'react'
import firebase, { firestore, signInWithGoogle } from '../firebase/firebase-utils'
import { Button, Accordion } from 'react-bootstrap'
import { AiOutlineHeart, AiOutlineSend, AiFillHeart } from 'react-icons/ai'

function RepliesModel(props) {
    const [usernames, setusernames] = useState([]);

    useEffect(() => {
        firestore.collection('Users').onSnapshot(querySnapshot => {
            const usernames = querySnapshot.docs.map(doc => {
                return doc.data().username
            })
            setusernames(usernames)
        })
    }, []);

    const handleReply = (username) => {
        document.getElementById(props.cID).focus()
        document.getElementById(props.cID).value = '@' + username + '  '
    }

    function containsAny(Reply) {
        for (var i = 0; i !== usernames.length; i++) {
           var username = usernames[i];
           if (Reply.indexOf(username) !== - 1) {
             return username;
           }
        }
        return null; 
    }

    return (
        <div className="RepliesSection">
            {props.replies.map(reply => {
                const mention = containsAny(reply.reply)
                let message = reply.reply.replace('@', '')
                message = message.replace(mention, '')
                return <p key={message}>
                    <strong>{reply.username}&nbsp;<span>{' @' + mention}</span></strong>
                    &nbsp;
                    {message}
                    &nbsp;&nbsp;
                    <span style={{ cursor: 'pointer' }} onClick={() => handleReply(reply.username)}>reply</span>
                </p>
            })}
        </div>
    )
}

function CommentModel(props) {
    const [reply, setreply] = useState('@' + props.username + ' ');
    let [Comments, setComments] = useState(null);

    useEffect(() => {
        firestore.collection('Blogs').doc(props.id).onSnapshot(blog => {
            setComments(blog.data().comments)
        })
    }, [props.id]);

    const submitReply = () => {
        let index = Comments.findIndex((comment) => comment.id === props.cID)

        Comments[index] = {
            ...Comments[index],
            'replies': [...Comments[index].replies, { 'reply': reply, 'time': Date.now(), 'username': props.name }]
        }

        firestore.collection('Blogs').doc(props.id).update({
            'comments': Comments
        })

        setreply('')

    }

    const handleLike = () => {
        let index = Comments.findIndex((comment) => comment.id === props.cID)

        if (!props.likes.find((id) => id === props.uid)) {
            Comments[index] = {
                ...Comments[index],
                'likes': [...Comments[index].likes, props.uid]
            }
        }

        else {
            Comments[index] = {
                ...Comments[index],
                'likes': props.likes.filter((id) => id !== props.uid)
            }
        }

        firestore.collection('Blogs').doc(props.id).update({
            'comments': Comments
        })
    }

    return (
        <div className="CommentModal">
            <div className="commentHeader">
                <div className="UserAvatar" style={{ color: props.theme }}>
                    <img src={props.profile} alt="" height="24px" />
                    <div>
                        <strong>{props.username}</strong>
                        <p><cite>{"2d"} ago</cite></p>
                    </div>
                </div>
                <div className="CommentActions">
                    <p onClick={handleLike}>
                        {
                            props.likes.find((id) => id === props.uid) ?
                                <AiFillHeart style={{ fontSize: '16px', color: 'tomato' }} />
                                : <AiOutlineHeart style={{ fontSize: '16px' }} />
                        }
                        &nbsp;{props.likes.length}
                    </p>
                </div>
            </div>
            <p className="CommentText">{props.comment}</p>
            <Accordion>
                <div className="AccordinHeader">
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', maxWidth: '500px', width: '100%', marginBottom: '10px' }}>
                        <AiOutlineSend style={{ color: 'blue' }} />
                        <input value={reply} id={props.cID} onChange={(e) => setreply(e.target.value)} onKeyUp={(e) => e.keyCode === 13 ? submitReply() : null} type="text" placeholder="Reply" />
                    </div>
                    <Accordion.Toggle as='p' style={{ cursor: 'pointer', margin: '10px 0' }} variant="link" eventKey="0">
                        <cite>-- view {props.replies.length} replies --</cite>
                    </Accordion.Toggle>
                </div>
                <p></p>
                <Accordion.Collapse eventKey="0">
                    <RepliesModel replies={props.replies} cID={props.cID} id={props.id} />
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

    let cID = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

    cID = cID + cID + '-' + cID + '-' + cID + '-' + cID + '-' + cID + cID + cID

    const handleClick = (e) => {
        e.preventDefault();
        if (Comment !== '') {
            firestore.collection('Blogs').doc(props.id).update({
                'comments': firebase.firestore.FieldValue.arrayUnion({
                    'username': username,
                    'comment': Comment,
                    'time': new Date().toString(),
                    'profile': props.user.photoURL,
                    'id': cID,
                    'likes': [],
                    'replies':[]
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
                {comments.map(comment => {
                    return <CommentModel
                        id={props.id}
                        uid={props.user.uid}
                        name={username}
                        key={comment.id}
                        cID={comment.id}
                        username={comment.username}
                        comment={comment.comment}
                        time={comment.time}
                        likes={comment.likes}
                        replies={comment.replies}
                        profile={comment.profile} />
                })}
            </div>
        </div>
    )
}

export default Reviews
