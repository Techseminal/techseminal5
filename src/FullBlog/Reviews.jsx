import React, { useState } from 'react'
import { signInWithGoogle } from '../firebase/firebase-utils'
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
                        <input type="text" placeholder="send reply..." />
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
    const handleClick = (e) => {
        e.preventDefault();
        let comment = document.getElementById('commentField').value;

        if (comment !== "") {
            console.log(comment);
            document.getElementById('commentField').value = "";
        }
    }
    return (
        <div className="Reviews">
            <h5>Comments</h5>
            {
                props.user ?
                    <form className="PostReviewField">
                        <input id="commentField" type="text" placeholder='leave your comment...' className="commentField" />
                        <Button type='submit' onClick={handleClick} className="sendBtn" variant="light" style={{ color: props.theme }}>send</Button>
                    </form> : <Button onClick={signInWithGoogle}>SignIn to post reviews</Button>
            }
            <div className="AllComments">
                {
                    props.user ?
                        <>
                            <CommentModel user={props.user} />
                            <CommentModel user={props.user} />
                        </>
                        : null
                }
            </div>
        </div>
    )
}

export default Reviews
