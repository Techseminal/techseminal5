import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './Profile.scss'
import { Container } from 'react-bootstrap'
import Navbar from '../ExplorePage/Navbar'
import Section1 from './Section1'
import Section2 from './Section2'
import EditProfile from './EditProfile'

function Profile(props) {
    const [Edit, setEdit] = useState(false)

    const handleEdit = (value) => { setEdit(value) }

    useEffect(() => {
        if(props.location.search === '?edit=true'){
            setEdit(true)
        } 
    }, [props.location.search]);
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
                                <Section2 user={props.user} saved={props.saved}/>
                            </>
                        : null
                }
            </Container>
        </div>
    )
}

export default withRouter(Profile);
