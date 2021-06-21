import React from 'react'
import './Profile.scss'
import { Container} from 'react-bootstrap'
import Navbar from '../ExplorePage/Navbar'
import Section1 from './Section1'
import Section2 from './Section2'

function Profile(props) {
    return (
        <div style={{ backgroundColor: '#fff', padding: "150px 0", minHeight: '100vh' }}>
            <Navbar user={props.user} />
            <Container>
                {
                    props.user ?
                        <>
                            <Section1 user={props.user}/>
                            <Section2 user={props.user}/>
                        </>
                        : null
                }
            </Container>
        </div>
    )
}

export default Profile
