import React from 'react'
import '../global.scss'
// import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <>
            <div className="loader">
                <div className="lds-hourglass"></div>
            </div>
        </>
    )
}

export default Loader
