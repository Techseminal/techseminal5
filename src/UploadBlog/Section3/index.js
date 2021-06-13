import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Image } from 'react-bootstrap'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function Section3({ cphoto, HdImage }) {
    const [src, setFile] = useState(null)

    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [croppedImg, setCroppedImg] = useState(null)

    const handleFileChange = (e) => {
        if (e.target.files.length !== 0) {
            console.log(e.target.files[0])
            setFile(URL.createObjectURL(e.target.files[0]))
        } else {
            window.alert("Select Image File")
        }
        setCroppedImg(null)
    }

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );


        if (canvas.width !== 0 || canvas.height !== 0) {
            // As Base64 string
            console.log(canvas)
            const base64Image = canvas.toDataURL('image/jpeg');
            setCroppedImg(base64Image);
            HdImage(base64Image)
            // As Blob Image
            // canvas.toBlob(blob => {
            //     console.log(blob)
            // })
        } else { window.alert('Please crop the image correctly ... 😇 ') }
    }

    useEffect(() => {
        setFile(cphoto)
       // eslint-disable-next-line 
    }, [])

    return (
        <Container style={{ minHeight: '500px' }}>
            <Form.Group>
                <Form.File id="exampleFormControlFile1" label="Choose IMAGE related to your idea" onChange={handleFileChange} />
            </Form.Group>
            {
                croppedImg ?
                    <>
                        <center>
                            <Image src={croppedImg} fluid alt="Result" style={{ width: '100%' }} />
                            <br />
                            <Button variant='primary' style={{ width: '200px', marginTop: '20px' }} onClick={() => setCroppedImg(null)}>Recrop</Button>
                        </center>
                    </>
                    : src
                        ?
                        <center>
                            <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                            <br />
                            <Button variant='danger' style={{ width: '200px', marginTop: '20px' }} onClick={getCroppedImg}>Crop</Button>
                        </center> : null
            }
        </Container>
    )
}

export default Section3
