import React, { useState, useEffect } from 'react'
import firebase, { firestore, signInWithGoogle } from '../firebase/firebase-utils'
import { Button, Accordion } from 'react-bootstrap'
import { AiOutlineHeart, AiOutlineSend, AiFillHeart, AiFillDelete } from 'react-icons/ai'
import DisplayProfile from '../components/DisplayProfile'

// replies-modal
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
                return <p key={reply.time}>
                    <strong>{reply.username}&nbsp;<span>{' @' + mention}</span></strong>
                    &nbsp;
                    {message}
                    &nbsp;&nbsp;
                    <span style={{ cursor: 'pointer' }} onClick={() => handleReply(reply.username)}>reply
                        &nbsp;&nbsp;{reply.username === props.name ? <AiFillDelete onClick={() => props.delete(reply.time)} style={{ color: 'red' }} /> : null}
                    </span>
                </p>
            })}
        </div>
    )
}

// comment-moadl

function CommentModel(props) {
    const [reply, setreply] = useState('@' + props.username + '  ');
    let [Comments, setComments] = useState(null);
    const [UID, setUID] = useState(null);

    useEffect(() => {
        firestore.collection('Blogs').doc(props.id).onSnapshot(blog => {
            setComments(blog.data().comments)
        })
    }, [props.id]);

    useEffect(() => {
        if (props.username) {
            firestore.collection('Users').where('username', '==', props.username).get().then((user) => {
                const uid = user.docs.map((doc) => doc.id)
                setUID(uid[0])
            })
        }
    }, [props.username]);

    const submitReply = () => {
        let index = Comments.findIndex((comment) => comment.id === props.cID)

        Comments[index] = {
            ...Comments[index],
            'replies': [...Comments[index].replies, { 'reply': reply, 'time': Date.now(), 'username': props.name }]
        }

        firestore.collection('Blogs').doc(props.id).update({
            'comments': Comments
        })

        setreply('@' + props.username + '  ')
    }

    const deleteReply = (time) => {
        let index = Comments.findIndex((comment) => comment.id === props.cID)

        let replies = Comments[index].replies

        replies = replies.filter((reply) => reply.time !== time)

        Comments[index] = {
            ...Comments[index],
            'replies': replies
        }

        firestore.collection('Blogs').doc(props.id).update({
            'comments': Comments
        })

    }
    const handleLike = () => {
        let index = Comments.findIndex((comment) => comment.id === props.cID)

        if (!props.likes.find((id) => id === props.user.uid)) {
            Comments[index] = {
                ...Comments[index],
                'likes': [...Comments[index].likes, props.user.uid]
            }
        }

        else {
            Comments[index] = {
                ...Comments[index],
                'likes': props.likes.filter((id) => id !== props.user.uid)
            }
        }

        firestore.collection('Blogs').doc(props.id).update({
            'comments': Comments
        })
    }

    const deleteComment = () => {
        let comments = Comments.filter((comment) => comment.id !== props.cID)
        setComments(comments)
        firestore.collection('Blogs').doc(props.id).update({
            'comments': comments
        })
    }

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    const [modal, setmodal] = useState(false);

    return (
        <div className="CommentModal">
            {UID ? <DisplayProfile show={modal} closeModal={() => setmodal(false)} uid={UID} /> : null}
            <div className="commentHeader">
                <div className="UserAvatar" style={{ color: props.theme }}>
                    <img src={props.profile} alt="" height="24px" />
                    <div>
                        <strong onClick={() => setmodal(true)}>{props.username}</strong>
                        <p><cite>{timeSince(props.time)} ago</cite></p>
                    </div>
                </div>
                <div className="CommentActions">
                    <p onClick={props.user ? handleLike : signInWithGoogle}>
                        {
                            props.likes.find((id) => id === props.user?.uid) ?
                                <AiFillHeart style={{ fontSize: '16px', color: 'tomato' }} />
                                : <AiOutlineHeart style={{ fontSize: '16px' }} />
                        }
                        &nbsp;{props.likes.length}
                    </p>
                </div>
            </div>
            <p className="CommentText">
                {props.comment}
                {props.username === props.name ? <AiFillDelete onClick={deleteComment} style={{ cursor: 'pointer', float: 'right', color: 'red', fontSize: '16px' }} /> : null}
            </p>
            <Accordion>
                <div className="AccordinHeader">
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', maxWidth: '500px', width: '100%', marginBottom: '10px' }}>
                        <AiOutlineSend style={{ color: 'blue' }} />
                        <input value={reply} id={props.cID} onChange={(e) => setreply(e.target.value)} onKeyUp={(e) => e.keyCode === 13 ? props.user ? submitReply() : signInWithGoogle() : null} type="text" placeholder="Reply" />
                    </div>
                    <Accordion.Toggle as='p' style={{ cursor: 'pointer', margin: '10px 0' }} variant="link" eventKey="0">
                        {props.replies.length === 0 ? null : <cite>-- view {props.replies.length} replies --</cite>}
                    </Accordion.Toggle>
                </div>
                <p></p>
                <Accordion.Collapse eventKey="0">
                    <RepliesModel replies={props.replies} name={props.name} delete={deleteReply} cID={props.cID} id={props.id} />
                </Accordion.Collapse>
            </Accordion>
            <br />
        </div>
    )
}

// Reviews modal {default}

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
                    'time': Date.now(),
                    'profile': props.user.photoURL,
                    'id': cID,
                    'likes': [],
                    'replies': []
                })
            })
            setComment('')
        }
    }

    const signIn = (e) => {
        e.preventDefault();
        signInWithGoogle()
    }

    return (
        <div className="Reviews">
            <h5>Comments</h5>
            <form className="PostReviewField">
                <input id="commentField" value={Comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder='leave your comment...' className="commentField" />
                <Button type='submit' onClick={props.user ? handleClick : signIn} className="sendBtn" variant="light" style={{ color: props.theme }}>send</Button>
            </form>
            <div className="AllComments">
                {comments.map(comment => {
                    return <CommentModel
                        id={props.id}
                        user={props.user}
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
