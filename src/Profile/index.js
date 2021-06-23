import React, { useState } from 'react'
import './Profile.scss'
import { Container } from 'react-bootstrap'
import Navbar from '../ExplorePage/Navbar'
import Section1 from './Section1'
import Section2 from './Section2'
import EditProfile from './EditProfile'

function Profile(props) {
    const [Edit, setEdit] = useState(false)

    const handleEdit = (value) => { setEdit(value) }
    return (
        <div style={{ backgroundColor: '#fff', padding: "100px 0", minHeight: '100vh' }}>
            <Navbar user={props.user} />
            <Container>
                {
                    props.user ?
                        Edit ?
                            <EditProfile HEdit={handleEdit} user={props.user} />
                            :
                            <>
                                <Section1 user={props.user} HEdit={handleEdit} />
                                <Section2 user={props.user} />
                            </>
                        : null
                }
            </Container>
        </div>
    )
}

export default Profile
