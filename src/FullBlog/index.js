import React from 'react'
import { Container, Image, Row, Button, Card } from 'react-bootstrap'
import './FullBlog.scss'
import PortrayData from '../ExplorePage/Portray/PortrayData'
import { usePalette } from 'react-palette'
import { AiOutlineStar, AiOutlineSave, AiOutlineShareAlt, AiFillFacebook, AiOutlineTwitter, AiFillLinkedin, AiFillInstagram, AiFillMail, AiOutlineTeam } from 'react-icons/ai'


function FullPortray(props) {

    const portrayId = props.match.params.id;
    // eslint-disable-next-line
    const { data, loading, error } = usePalette(PortrayData[portrayId].image)

    return (
        <>
            <Row className="FullBlog">
                <Container>

                    {/* Header Section */}
                    <header>
                        <div className="UserAvatar" style={{ color: data.vibrant }}>
                            <img src="https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg" alt="" height="24px" />
                            <div>
                                <strong>{PortrayData[portrayId].author}</strong>
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
                        <Image fluid className="CoverPhoto" src={PortrayData[portrayId].image} alt="" />
                        <p className="Title"><u>{PortrayData[portrayId].title}</u></p>
                        <p className="descrip">
                            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                            ipsam atque a dolores quisquam quisquam adipisci possimus
                            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                            deleniti rem!
                            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                            ipsam atque a dolores quisquam quisquam adipisci possimus
                            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                            deleniti rem!
                            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                            ipsam atque a dolores quisquam quisquam adipisci possimus
                            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                            deleniti rem!
                        </p>
                    </article>
                    <br/>
                    <Button variant="light" className="TeamRequestBtn" style={{border:`1px solid ${data.vibrant}`}} title="Send team request"><AiOutlineTeam style={{ color: data.vibrant }} />&nbsp;&nbsp;Team request</Button>
                    <br/>
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
                        <p>Follow <strong style={{ color: data.vibrant }}>{PortrayData[portrayId].author}</strong> on</p>
                        <div>
                            <Button variant="light" title="Facebook"><AiFillFacebook style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" title="Twitter"><AiOutlineTwitter style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" title="Instagram"><AiFillInstagram style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" title="Linked-in"><AiFillLinkedin style={{ color: data.vibrant }} /></Button>
                            <Button variant="light" title="Mail"><AiFillMail style={{ color: data.vibrant }} /></Button>
                        </div>
                    </div>
                </Container>
            </Row>
        </>
    )
}

export default FullPortray
