import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import './Portray.scss'
import { withRouter } from "react-router-dom";
import { AiOutlineStar, AiOutlineSave } from 'react-icons/ai'
import { usePalette } from 'react-palette'

function PortrayCard(props) {

    const PushId = () => {
        props.history.push('/' + props.id)
        window.scrollTo(0, 0)
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
                                <Badge key={tag.index} variant="light" style={{ color: data.vibrant }}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <footer>
                        <div className="UserAvatar">
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" style={{border:`2px solid ${data.vibrant}`}} alt="" height="24px" />
                            <p>{props.author}</p>
                        </div>
                        <div className="RightSide">
                            <div className="Save">
                                <Button variant="light" title="give a star"><AiOutlineStar />&nbsp;300</Button>
                            </div>
                            &nbsp;
                            <div className="Likes">
                                <Button variant="light" title="save the post"><AiOutlineSave /></Button>
                            </div>
                        </div>
                    </footer>
                </Card.Body>
            </Card>
        </>
    )
}

export default withRouter(PortrayCard);