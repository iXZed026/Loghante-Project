import React, { useState } from 'react'

function useActive(initial: boolean) {

    const [active, setActive] =
        useState<boolean>(initial);

    const activeHandler: () => void =
        () => {
            setActive(true);
        }

    const UnActiveHandler: () => void =
        () => {
            setActive(false);
        }

    const toggleHandler = () => {
        setActive(prev => !prev)
    }

    return { active, activeHandler, UnActiveHandler,toggleHandler }
}

export default useActive