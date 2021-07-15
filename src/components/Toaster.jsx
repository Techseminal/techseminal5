import React from 'react'

function Toaster({ message }) {

    return (
        <div id="toast">
            {message}
        </div>
    );
}

export default Toaster