import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Portray from '../ExplorePage/Portray/index'
import { firestore } from '../firebase/firebase-utils'


function Section2(props) {
    const [myPosts, setmyPosts] = useState([]);
    const [savedPosts, setsavedPosts] = useState([]);
    useEffect(() => {
        firestore.collection('Blogs').where('userUID', '==', props.user.uid).onSnapshot(querySnapshot => {
            const myposts = querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setmyPosts(myposts)
        })
    }, [props.user]);
    useEffect(() => {   
        firestore.collection('Blogs').onSnapshot(querySnapshot => {
            const Blogs = querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            let savedposts = Blogs.map(blog => {
                return props.saved.find((docID) => docID === blog.id) ? blog : null
            })
            savedposts = savedposts.filter((post) => post!==null)
            setsavedPosts(savedposts)
        })
    }, [props.saved]);
    return (
        <Tabs
            defaultActiveKey="posts"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            style={{ margin: '50px 0' }}
        >
            <Tab eventKey="posts" title="My Posts">
                <Portray user={props.user} saved={props.saved} Blogs={myPosts} />
            </Tab>
            <Tab eventKey="saved" title="Saved Posts">
                <Portray user={props.user} saved={props.saved} Blogs={savedPosts}/>
            </Tab>
        </Tabs>
    )
}

export default Section2
