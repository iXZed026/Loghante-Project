import Container from '@/components/shared/Container'
import ConferenceHallHeader from '@/features/loghante(root)/conference-hall/components/ConferenceHallHeader'
import React from 'react'

function ConferenceHall() {
    return (
        <Container>
            <div className='min-h-screen xl:px-36 py-30 fcol gap-y-20'>
                <ConferenceHallHeader />
            </div>
        </Container>
    )
}

export default ConferenceHall