import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

function DisplayProfile(props) {
    const [Modal, setModal] = useState(false)

    useEffect(() => {
        console.log(props.state)
        setModal(props.state)
    }, [props.state])

    return (
        Modal ?
            <div className="modal-custom" style={{ width: '100px', height: '100px' }}>
                <section className="modal-body">
                    <AiFillCloseCircle onClick={()=>setModal(false)} style={{ fontSize:'20px', position:'absolute',right:'15px'}} />
                    Hello
                </section>
            </div > : null
    )
}

export default DisplayProfile
