"use client"

import FadeUp from '@/components/animations/FadeUp'
import TicketBox from '@/features/loghante(root)/profile/componenets/ticket-purchased/TicketBox'
import {
    getUserBookings,
    UserBookingResponse,
} from '@/lib/api/ticket/booking'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

function TicketPurchased() {

    const locale = useLocale()

    const ticketPurchasedT = useTranslations(
        "profileTicketPurchased",
    )

    const [
        bookings,
        setBookings,
    ] = useState<
        UserBookingResponse[]
    >([])

    const [
        isLoading,
        setIsLoading,
    ] = useState(true)

    useEffect(() => {

        async function fetchBookings() {

            try {

                const response =
                    await getUserBookings(
                        locale
                    )

                setBookings(
                    response.data ?? []
                )

            } catch (error) {

                console.error(
                    "Failed to fetch user bookings:",
                    error
                )

            } finally {

                setIsLoading(false)

            }
        }

        fetchBookings()

    }, [locale])

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <FadeUp>

            <div>

                {/* Ticket Purchased Header */}
                <div className='mb-18'>
                    <h2 className='font-medium md:text-4xl text-2xl'>
                        {ticketPurchasedT("title")}
                    </h2>
                </div>

                {/* Tickets */}
                <div className='fcol gap-5 xl:px-20'>

                    {bookings.length > 0 ? (

                        bookings.map(
                            (ticket) => (

                                <TicketBox
                                    key={ticket.bookingId}
                                    eventTypeName={ticket.eventTypeName}
                                    name={ticket.name}
                                    startAt={ticket.startAt}
                                    duration={ticket.duration}
                                    quantity={ticket.quantity}
                                />

                            )
                        )

                    ) : (

                        <p className='text-center'>
                            You don't have any tickets at the moment.
                        </p>

                    )}

                </div>

            </div>

        </FadeUp>
    )
}

export default TicketPurchased

