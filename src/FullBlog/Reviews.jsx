import React from 'react'
import { signInWithGoogle } from '../firebase/firebase-utils'
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
        </div>
    )
}

function CommentModel(props) {
    return (
        <>
            <div className="UserAvatar" style={{ color: props.theme }}>
                <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" height="24px" />
                <div>
                    <strong>{props.user.displayName}</strong>
                    <p><cite>{new Date().toString()}</cite></p>
                </div>
            </div>
            <p className="CommentText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque consequatur veritatis maiores explicabo rerum nisi animi laudantium repudiandae debitis consequuntur impedit sed iusto, odit, inventore aspernatur labore placeat ipsa.</p>
            <div className="CommentActions">
                <p>
                    <span>{3} likes</span>
                    <span>{10} replies</span>
                </p>
            </div>
            <RepliesModel />
        </>
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
                        <CommentModel user={props.user} />
                        : null
                }
            </div>
        </div>
    )
}

export default Reviews
