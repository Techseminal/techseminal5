import React from 'react'
import { Container, Image, Badge } from 'react-bootstrap'
import './styles.scss'
import { usePalette } from 'react-palette'

function PostBlog({ title, discp, Cphoto, tags }) {
    // eslint-disable-next-line
    const { data, loading, error } = usePalette(Cphoto)
    return (
        <>
            <Container>
                <h2 style={{ textAlign: 'center' }}>Preview</h2>
                <article>
                    <Image fluid className="CoverPhoto" src={Cphoto} alt="" />
                    <p className="Title"><u>{title}</u></p>
                    <div dangerouslySetInnerHTML={{ __html: discp }} />
                    {tags.map(tag => (
                        <Badge key={tag} variant="light" style={{ color: data.vibrant, fontSize: '16px', marginRight: '10px' }}>{tag}</Badge>
                    ))}
                </article>
            </Container>
        </>
    )
}

export default PostBlog
