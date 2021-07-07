import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom'

const useUnsavedChangesWarning = (message = "Are you sure want to discard changes") => {
    const [isDirty, setisDirty] = useState(false);

    useEffect(() => {
        // Detecting browser closing
        window.onbeforeunload = isDirty && (() => message)
        return () => {
            window.onbeforeunload = null
        }
    }, [isDirty, message]);

    const routerPrompt = <Prompt when={isDirty} message={message}/>
    return [routerPrompt, () => setisDirty(true), () => setisDirty(false)];
};

export default useUnsavedChangesWarning;