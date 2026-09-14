"use client"

import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import React, {
    FormEvent,
    useState,
} from 'react'
import {
    useLocale,
    useTranslations
} from 'next-intl'
import PaymentDiscoutCodeDropDown from './PaymentDiscoutCodeDropDown'

import {
    createBooking
} from '@/lib/api/ticket/booking'

import {
    useTicketPayment
} from '../../context/TicketPaymentContext'

import {
    formatPrice
} from '@/lib/utils/formatPrice'

function PaymentDetails() {

    const paymentPaymentDetailsT =
        useTranslations(
            "payment.payment-details"
        )

    const commonT =
        useTranslations("common")

    const locale =
        useLocale()

    const {
        paymentData,
        clearPaymentData,
    } = useTicketPayment()

    const [
        paymentMethod,
        setPaymentMethod,
    ] = useState<string>("")

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState<boolean>(false)

    const [
        errorMessage,
        setErrorMessage,
    ] = useState<string>("")

    if (!paymentData) {
        return null;
    }

    const {
        ticket,
        quantity,
    } = paymentData

    const unitPrice =
        ticket.price ?? 0

    const totalPrice =
        unitPrice * quantity

    const vat =
        totalPrice * 0.1

    const payable =
        totalPrice + vat

    const submitHandler =
        async (
            event: FormEvent<HTMLFormElement>
        ) => {

            event.preventDefault()

            if (quantity < 1) {
                return
            }

            if (!paymentMethod) {

                setErrorMessage(
                    "Please select a payment method."
                )

                return
            }

            setIsSubmitting(true)
            setErrorMessage("")

            try {

                const response =
                    await createBooking(
                        {
                            sessionId:
                                ticket.sessionId,

                            quantity,
                        },
                        locale
                    )

                if (!response.success) {

                    setErrorMessage(
                        response.message
                    )

                    return
                }

                /*
                 * Booking was created successfully.
                 *
                 * Later, when the payment gateway
                 * is implemented, redirect the user
                 * to the payment gateway here.
                 */

                clearPaymentData()

                console.log(
                    "Booking created:",
                    response.data
                )

            } catch {

                setErrorMessage(
                    "An error occurred while creating the booking."
                )

            } finally {

                setIsSubmitting(false)

            }
        }

    return (
        <form
            onSubmit={submitHandler}
            className={cn(
                "lg:col-span-6 col-span-12",
                "md:p-10 p-8",
                "border-[1px] border-black-opacity",
                "rounded-xl",
                "md:text-base text-sm",
                "pb-28 md:pb-10",
            )}
        >

            {/* Payment Details */}
            <div>

                <span className="text-xl font-semibold">
                    {
                        paymentPaymentDetailsT(
                            "title"
                        )
                    }
                </span>

            </div>

            {/* Ticket Details */}
            <div className="fcol py-5 px-5">

                <div
                    className="py-10 border-b-[1px] border-black-opacity"
                >

                    <div className="fbc mb-5">

                        <span className="w-full">

                            {
                                paymentPaymentDetailsT(
                                    "ticket-details.ticket"
                                )
                            }{" "}

                            {
                                formatPrice(
                                    unitPrice
                                )
                            }

                            {commonT("price-type")}

                        </span>

                        <span className="w-full text-center">

                            {quantity}{" "}

                            {
                                paymentPaymentDetailsT(
                                    "ticket-details.ticket-count"
                                )
                            }

                        </span>

                        <span className="w-full text-end">

                            {
                                formatPrice(
                                    totalPrice
                                )
                            }

                            {commonT("price-type")}

                        </span>

                    </div>

                    <div className="fbc">

                        <span className="w-full">

                            {
                                paymentPaymentDetailsT(
                                    "ticket-vat.ticket-vat"
                                )
                            }

                        </span>

                        <span className="w-full text-center">
                            10%
                        </span>

                        <span className="w-full text-end">

                            {
                                formatPrice(
                                    vat
                                )
                            }

                            {commonT("price-type")}

                        </span>

                    </div>

                </div>

                {/* Payable */}
                <div className="py-10 fbc">

                    <span className="font-bold text-xl">

                        {
                            paymentPaymentDetailsT(
                                "payable"
                            )
                        }

                    </span>

                    <span className="text-xl font-bold text-crimson">

                        {
                            formatPrice(
                                payable
                            )
                        }

                        {commonT("price-type")}

                    </span>

                </div>

            </div>

            {/* Discount */}
            <PaymentDiscoutCodeDropDown />

            {/* Payment Method */}
            <div
                className="fcol items-start gap-10 mb-15"
            >

                <div>

                    <span className="text-xl">
                        {
                            paymentPaymentDetailsT(
                                "payment-method.title"
                            )
                        }
                    </span>

                </div>

                <div
                    className="fcol items-start gap-5"
                >

                    {/* Saman Portal */}
                    <label
                        className={cn(
                            "flex items-center gap-2",
                            "cursor-pointer"
                        )}
                    >

                        <input
                            type="radio"
                            name="payment-method"
                            value="saman"
                            checked={
                                paymentMethod ===
                                "saman"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        <span>
                            {
                                paymentPaymentDetailsT(
                                    "payment-method.saman"
                                )
                            }
                        </span>

                    </label>

                    {/* Another Portal */}
                    <label
                        className={cn(
                            "flex items-center gap-2",
                            "cursor-pointer"
                        )}
                    >

                        <input
                            type="radio"
                            name="payment-method"
                            value="another"
                            checked={
                                paymentMethod ===
                                "another"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        <span>
                            {
                                paymentPaymentDetailsT(
                                    "payment-method.another"
                                )
                            }
                        </span>

                    </label>

                </div>

            </div>

            {/* Error */}
            {
                errorMessage && (

                    <div
                        className="mb-5 text-red-600"
                    >
                        {errorMessage}
                    </div>

                )
            }

            {/* Payment Button */}
            <div
                className={cn(
                    "fixed",
                    "bottom-0",
                    "left-0",
                    "right-0",
                    "z-50",
                    "bg-white",
                    "sm:static",
                    "md:p-0",
                    "md:bg-transparent",
                    "md:z-auto",
                )}
            >

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        "w-full",
                        "fbc",
                        "font-bold",
                        "px-4 md:py-4 py-5",
                        "bg-crimson",
                        "md:rounded-lg rounded-none",
                        "hover:bg-[var(--crimson-hover-color)]",

                        isSubmitting &&
                        "opacity-60 cursor-not-allowed"
                    )}
                >

                    <span>

                        {
                            isSubmitting
                                ? "Processing..."
                                : paymentPaymentDetailsT(
                                    "payment-button"
                                )
                        }

                    </span>

                    <span>

                        {
                            formatPrice(
                                payable
                            )
                        }

                        {commonT("price-type")}

                    </span>

                </Button>

            </div>

        </form>
    )
}

export default PaymentDetails