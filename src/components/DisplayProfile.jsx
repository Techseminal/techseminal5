import React, { useState, useEffect } from 'react'

function DisplayProfile(props) {
    const [Modal, setModal] = useState(false)

    useEffect(() => {
        setModal(props.state)
    }, [props.state])
    return (
        Modal ?
            <div className="modal-custom" style={{ width: '100px', height: '100px' }}>
                <section className="modal-body">
                    Hello
                </section>
            </div > : null
    )
}

export default DisplayProfile
