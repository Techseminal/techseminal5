import React from 'react'
import { Tabs, Tab} from 'react-bootstrap'
// import PortrayCard from '../ExplorePage/Portray/PortrayCard'
// import { firestore } from '../firebase/firebase-utils'


function Section2(props) {
    return (
        <Tabs
            defaultActiveKey="posts"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            style={{ margin: '50px 0' }}
        >
            <Tab eventKey="posts" title="My Posts">
                No Posts uploaded
            </Tab>
            <Tab eventKey="saved" title="Saved Posts">
                 No Saved Posts
            </Tab>
        </Tabs>
    )
}

export default Section2
