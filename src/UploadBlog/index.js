import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Button, Container, ProgressBar } from 'react-bootstrap'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Post from './Post'
import { firestore as db } from '../firebase/firebase-utils'
import { withRouter } from 'react-router-dom'
import Loader from '../components/Loader'

function UploadBlog(props) {

    // Loder
    const [loader, setLoader] = useState(false)

    const [Category, setCategory] = useState("Choose...")
    const [Title, setTitle] = useState("")
    const [Discrip, setDiscrip] = useState("<p></p>")
    const [Tags, setTags] = useState([])
    const [CPhoto, setCPhoto] = useState(null)
    // eslint-disable-next-line
    const [Status, setStatus] = useState(null)

    const [Progress, setProgress] = useState(20);

    const handleCategory = (value) => { setCategory(value); }
    const handleTitle = (value) => { setTitle(value); }
    const handleDiscrip = (value) => { setDiscrip(value); }
    const handleTags = (value) => { setTags(value); }
    const handleCPhoto = (value) => { setCPhoto(value); }
    const handleStatus = (value) => { setStatus(value); }

    // checking next Btn condition
    useEffect(() => {
        // eslint-disable-next-line
        if (Progress === 20 && Category !== "Choose..." || Progress === 40 && Title !== "" && Discrip.length >= 10 && Tags.length >= 2 || Progress === 60 && CPhoto !== null || Progress === 80 && Status !== null && Progress !== 100) {
            document.getElementById("nextBtn").style.display = "block"
        } else {
            document.getElementById("nextBtn").style.display = "none"
        }
    }, [Title, Discrip, Tags, Progress, Category, CPhoto, Status])

    const UploadArticle = () => {
        setLoader(true)
        // Add a new document in collection "cities"
        db.collection("Blogs").doc().set({
            author: props.user.displayName,
            userUID: props.user.uid,
            category: Category,
            title: Title,
            discrp: Discrip,
            image: CPhoto,
            notifications: [],
            stars: [],
            tags: Tags,
            timestamp: Date.now()
        })
            .then(() => {
                setLoader(false);
                window.alert('uploaded successfully')
                props.history.push('/')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <>
            {loader ? <Loader /> : null}
            <div style={{ overflowX: 'hidden' }}>
                <ProgressBar style={{ height: '5px' }} animated now={Progress} />
                <AiOutlineClose
                    onClick={() => props.history.push('/')}
                    title="Close Upload"
                    style={{ margin: '20px', float: 'right', fontSize: '24px', color: 'gray', cursor: 'pointer', }}
                />
                <div style={{ margin: '100px 0', width: '100% aut0' }}>
                    {
                        Progress === 20 ?
                            <center><Section1 category={Category} CallBack={handleCategory} /></center>
                            :
                            Progress === 40 ?
                                <Section2 title={Title} discp={Discrip} tags={Tags} HdTitle={handleTitle} HdDiscp={handleDiscrip} HdTags={handleTags} />
                                :
                                Progress === 60 ?
                                    <Section3 cphoto={CPhoto} HdImage={handleCPhoto} />
                                    :
                                    Progress === 80 ?
                                        <Section4 status={Status} HdStatus={handleStatus} />
                                        :
                                        Progress === 100 ?
                                            <Post title={Title} discp={Discrip} Cphoto={CPhoto} tags={Tags} />
                                            : null
                    }
                </div>
                <Container style={{ marginBottom: '100px' }}>
                    {
                        Progress !== 20 ?
                            <Button onClick={() => setProgress(Progress - 20)} variant='light' style={{ border: '1px solid #007BFF', fontSize: '18px', padding: '5px 30px', borderRadius: '25px' }}>Previous</Button>
                            : null
                    }
                    {
                        Progress === 100 ?
                            <Button onClick={UploadArticle} id="uploadBtn" variant="success" style={{ fontSize: '18px', padding: '5px 30px', borderRadius: '25px', float: 'right' }}>Upload</Button>
                            : null
                    }
                    <Button onClick={() => setProgress(Progress + 20)} id="nextBtn" variant="primary" style={{ fontSize: '18px', padding: '5px 30px', borderRadius: '25px', display: 'none', float: 'right' }}>Next</Button>
                </Container>
            </div>
        </>
    )
}

export default withRouter(UploadBlog)
