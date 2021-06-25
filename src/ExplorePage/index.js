import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase/firebase-utils'
import Navbar from './Navbar'
import Banner from './Banner'
import SearchBar from './SearchBar'
import Portray from '../ExplorePage/Portray'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExplorePage.scss'
import Loader from '../components/Loader'


function ExplorePage(props) {
    //loader
    const [loader,setLoader] = useState(false)
    const [Blogs, setBlogs] = useState([]);
    const [filteredBlogs, setfilteredBlogs] = useState([]);
    const [searchKey, setsearchKey] = useState('');
    const [category, setcategory] = useState('All');
    const [sort, setsort] = useState('timestamp');
    const [filter, setfilter] = useState('tags');
    // set blogs
    useEffect(() => {
        if (category === 'All') {
            setLoader(true)
            firestore.collection('Blogs').onSnapshot(querySnapshot => {
                const blogs = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setBlogs(blogs);
                setLoader(false);
            })
        }
        else {
            firestore.collection('Blogs').where('category', '==', category).onSnapshot(querySnapshot => {
                const blogs = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setBlogs(blogs);
            })
        }
    }, [category]);
    // filter blogs
    useEffect(() => {
        if (searchKey === '') {
            setfilteredBlogs(Blogs);
        }
        else {
            if (filter === 'tags') {
                searchTag()
            }
            else if (filter === 'title') {
                searchTitle()
            }
            else if (filter === 'user') {
                searchUser()
            }
        }
        // eslint-disable-next-line
    }, [searchKey, Blogs, filter])

    function searchTag() {
        setfilteredBlogs(Blogs.filter((blog) => blog.tags.find((tag) => tag.toLowerCase().includes(searchKey.toLowerCase()))))
    }

    function searchTitle() {
        setfilteredBlogs(Blogs.filter((blog) => blog.title.toLowerCase().includes(searchKey.toLowerCase())))
    }

    function searchUser() {
        setfilteredBlogs(Blogs.filter((blog) => blog.author.toLowerCase().includes(searchKey.toLowerCase())))
    }

    function handleSearchKey(value) {
        setsearchKey(value)
    }

    function handleCategory(value) {
        setcategory(value)
    }

    function handleSort(value) {
        setsort(value)
    }

    function handleFilter(value) {
        setfilter(value)
    }

    function sortBlogs() {
        if (sort === 'timestamp') {
            return filteredBlogs.sort((a, b) => b.timestamp - a.timestamp)
        }
        else if (sort === 'stars') {
            return filteredBlogs.sort((a, b) => b.stars.length - a.stars.length)
        }
    }
    return (
        <div className="ExplorePage">
            {
                loader ? <Loader/> : null
            }
            <Navbar user={props.user} />
            <Banner />
            <SearchBar
                setsearchKey={handleSearchKey}
                setCategory={handleCategory}
                category={category}
                setsort={handleSort}
                setfilter={handleFilter}
                filter={filter} />
            <Portray Blogs={sortBlogs()} user={props.user} saved={props.saved} />
        </div>
    )
}

export default ExplorePage;