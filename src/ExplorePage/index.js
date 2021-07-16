import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase/firebase-utils'
import Navbar from './Navbar'
import Banner from './Banner'
import SearchBar from './SearchBar'
import Portray from '../ExplorePage/Portray'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExplorePage.scss'
import Loader from '../components/Loader'
import { withRouter } from 'react-router-dom'


function ExplorePage(props) {
    //loader
    const [loader, setLoader] = useState(false)
    const [BlogsDB, setBlogsDB] = useState([]);
    const [Blogs, setBlogs] = useState([]);
    const [filteredBlogs, setfilteredBlogs] = useState([]);
    const [searchKey, setsearchKey] = useState('');
    const [category, setcategory] = useState('All');
    const [sort, setsort] = useState('timestamp');
    const [filter, setfilter] = useState('tags');
    // set blogs
    useEffect(() => {
        setLoader(true)
        firestore.collection('Blogs').onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setBlogsDB(blogs)
            setLoader(false)
        })
    }, []);

    useEffect(() => {
        if (category === 'All') {
            setBlogs(BlogsDB)
        }
        else {
            setBlogs(BlogsDB.filter((blog) => blog.category === category))
        }
    }, [category, BlogsDB]);

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


    const searchTag = () => setfilteredBlogs(Blogs.filter((blog) => blog.tags.find((tag) => tag.toLowerCase().includes(searchKey.toLowerCase()))))
    const searchTitle = () => setfilteredBlogs(Blogs.filter((blog) => blog.title.toLowerCase().includes(searchKey.toLowerCase())))
    const searchUser = () => setfilteredBlogs(Blogs.filter((blog) => blog.author.toLowerCase().includes(searchKey.toLowerCase())))

    const handleCategory = (value) => setcategory(value)
    const handleSort = (value) => setsort(value)

    const handleSearchKey = (value) => {
        if (props.location.search !== '' && value === '') {
            props.history.push('/?user=')
        }
        setsearchKey(value)
    }

    const handleFilter = (value) => {
        if (props.location.search !== '') {
            props.history.push('/?user=')
        }
        setsearchKey('')
        setfilter(value)
    }

    useEffect(() => {
        const user = props.location.search.slice(6).replace('%20', ' ')
        if (user !== '') {
            setfilter('user')
            setsearchKey(user)
            searchUser()
        }
        else {
            setsearchKey('')
        }
        // eslint-disable-next-line
    }, [props.location.search]);

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
                loader ? <Loader /> : null
            }
            <Navbar user={props.user} />
            <Banner />
            <SearchBar
                searchKey={searchKey}
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

export default withRouter(ExplorePage);