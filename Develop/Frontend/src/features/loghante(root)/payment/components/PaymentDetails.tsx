"use client"

import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import PaymentDiscoutCodeDropDown from './PaymentDiscoutCodeDropDown'

function PaymentDetails() {

    const paymentPaymentDetailsT =
        useTranslations("payment.payment-details")

    const [paymentMethod, setPaymentMethod] =
        useState<string>("")

    return (
        <form
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
                    {paymentPaymentDetailsT("title")}
                </span>
            </div>

            {/* Ticket Details */}
            <div className="fcol py-5 px-5">

                <div className="py-10 border-b-[1px] border-black-opacity">

                    <div className="fbc mb-5">

                        <span className="w-full">
                            {paymentPaymentDetailsT("ticket-details.ticket")} 5$
                        </span>

                        <span className="w-full text-center">
                            1 {paymentPaymentDetailsT("ticket-details.ticket-count")}
                        </span>

                        <span className="w-full text-end">
                            5$
                        </span>

                    </div>

                    <div className="fbc">

                        <span className="w-full">
                            {paymentPaymentDetailsT("ticket-vat.ticket-vat")}
                        </span>

                        <span className="w-full text-center">
                            10%
                        </span>

                        <span className="w-full text-end">
                            3$
                        </span>

                    </div>

                </div>

                {/* Payable */}
                <div className="py-10 fbc">

                    <span className="font-bold text-xl">
                        {paymentPaymentDetailsT("payable")}
                    </span>

                    <span className="text-xl font-bold text-crimson">
                        8$
                    </span>

                </div>

            </div>

            {/* Discount */}
            <PaymentDiscoutCodeDropDown />

            {/* Payment Method */}
            <div className="fcol items-start gap-10 mb-15">

                <div>
                    <span className="text-xl">
                        {paymentPaymentDetailsT("payment-method.title")}
                    </span>
                </div>

                <div className="fcol items-start gap-5">

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
                            checked={paymentMethod === "saman"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />

                        <span>
                            {paymentPaymentDetailsT("payment-method.saman")}
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
                            checked={paymentMethod === "another"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />

                        <span>
                            {paymentPaymentDetailsT("payment-method.another")}
                        </span>

                    </label>

                </div>

            </div>

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
                    className={cn(
                        "w-full",
                        "fbc",
                        "font-bold",
                        "px-4 md:py-4 py-5",
                        "bg-crimson",
                        "md:rounded-lg rounded-none",
                        "hover:bg-[var(--crimson-hover-color)]",
                    )}
                >

                    <span>
                        {paymentPaymentDetailsT("payment-button")}
                    </span>

                    <span>
                        8$
                    </span>

                </Button>

            </div>

        </form>
    )
}

export default PaymentDetails