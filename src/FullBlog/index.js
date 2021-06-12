import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase-utils'
import { Container, Image, Row, Button, Card } from 'react-bootstrap'
import { usePalette } from 'react-palette'
import { AiOutlineStar, AiOutlineSave, AiOutlineShareAlt, AiFillFacebook, AiOutlineTwitter, AiFillLinkedin, AiFillInstagram, AiFillMail, AiOutlineTeam } from 'react-icons/ai'

import './FullBlog.scss'


function FullPortray(props) {
    const portrayId = props.match.params.id;
    const [Title, setTitle] = useState('');
    const [discrp, setdiscrp] = useState('');
    const [author, setauthor] = useState('');
    const [image, setimage] = useState('');
    const [UID, setUID] = useState('');
    const [Mail, setMail] = useState('');
    const [Facebook, setFacebook] = useState('');
    const [Instagram, setInstagram] = useState('');
    const [Twitter, setTwitter] = useState('');
    const [LinkedIn, setLinkedIn] = useState('');
    useEffect(() => {
        firestore.collection('Blogs').doc(portrayId).onSnapshot(doc => {
            setTitle(doc.data().title)
            setdiscrp(doc.data().discrp)
            setimage(doc.data().image)
            setauthor(doc.data().author)
            setUID(doc.data().userUID)
        })
    }, [portrayId]);
    useEffect(() => {
        if (UID !== '') {
            firestore.collection('Users').doc(UID).onSnapshot(doc => {
                setMail(doc.data().mail)
                setFacebook(doc.data().facebook)
                setInstagram(doc.data().instagram)
                setTwitter(doc.data().twitter)
                setLinkedIn(doc.data().linkedIn)
            })
        }
    }, [UID]);
    // eslint-disable-next-line
    const { data, loading, error } = usePalette(image)

    return (
        <>
            <Row className="FullBlog">
                <Container>

                    {/* Header Section */}
                    <header>
                        <div className="UserAvatar" style={{ color: data.vibrant }}>
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" height="24px" />
                            <div>
                                <strong>{author}</strong>
                                <p>Posted on <cite>22nd May 2021</cite></p>
                            </div>
                        </div>
                        <div className="Actions">
                            <Button variant="light" style={{ color: data.vibrant }}><AiOutlineStar />&nbsp; &nbsp;Star</Button>
                            <Button variant="light" style={{ color: data.vibrant }}><AiOutlineSave /></Button>
                            <Button variant="light" style={{ color: data.vibrant }}><AiOutlineShareAlt /></Button>
                        </div>
                    </header>

                    {/* Article Section */}
                    <article>
                        <Image fluid className="CoverPhoto" src={image} alt="" />
                        <p className="Title"><u>{Title}</u></p>
                        <p className="descrip">
                            {discrp}
                        </p>
                    </article>
                    <br />
                    <Button variant="light" className="TeamRequestBtn" style={{ border: `1px solid ${data.vibrant}` }} title="Send team request"><AiOutlineTeam style={{ color: data.vibrant }} />&nbsp;&nbsp;Team request</Button>
                    <br />
                    {/* Donate section  */}
                    <Card className="Donate">
                        <Card.Body>
                            <p><cite>Loved his work?</cite> <strong style={{ color: data.vibrant }}>Donate now... 😇</strong></p>
                            <div>
                                <Button className="Googlepay">Google pay</Button>
                                <Button className="Phonepe">Phonepe</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="Divider">
                        <hr style={{ height: '1px', backgroundColor: data.vibrant, borderRadius: '25px' }} />
                        <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" />
                    </div>
                    <div className="SocialMedia">
                        <p>Follow <strong style={{ color: data.vibrant }}>{author}</strong> on</p>
                        <div>
                            <Button variant="light" href={Facebook} title="Facebook"><AiFillFacebook style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" href={Twitter} title="Twitter"><AiOutlineTwitter style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" href={Instagram} title="Instagram"><AiFillInstagram style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" href={LinkedIn} title="Linked-in"><AiFillLinkedin style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" href={"mailto:" + Mail} title="Mail"><AiFillMail style={{ color: data.vibrant }} /></Button>
                        </div>
                    </div>
                </Container>
            </Row>
        </>
    )
}

export default FullPortray
