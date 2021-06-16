import React from 'react'

import Navbar from './Navbar'
import Banner from './Banner'
import SearchBar from './SearchBar'
import Portray from '../ExplorePage/Portray'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExplorePage.scss'

function ExplorePage(props) {
    return (
        <div className="ExplorePage">
            <Navbar user={props.user} />
            <Banner />
            <SearchBar />
            <Portray />
        </div>
    )
}

export default ExplorePage;

