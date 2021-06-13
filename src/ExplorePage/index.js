import React, { useState, useEffect } from 'react'
import { auth } from '../firebase/firebase-utils';

import Navbar from './Navbar'
import Banner from './Banner'
import SearchBar from './SearchBar'
import Portray from '../ExplorePage/Portray'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExplorePage.scss'

function ExplorePage() {
    const [user, setuser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setuser(user)
        })
    });
    return (
        <div className="ExplorePage">
            <Navbar user={user}/>
            <Banner />
            <SearchBar />
            <Portray />
        </div>
    )
}

export default ExplorePage;

