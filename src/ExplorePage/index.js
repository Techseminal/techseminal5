import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import SearchBar from './SearchBar'
import Portray from '../ExplorePage/Portray'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExplorePage.scss'

function ExplorePage() {
    return (
        <div className="ExplorePage">
            <Navbar />
            <Banner/>
            <SearchBar/>
            <Portray/>
        </div>
    )
}

export default ExplorePage;

