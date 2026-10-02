"use client";

import Loading from "@/components/ui/Loading";
import { getUserReservedSession } from "@/lib/api/ticket/booking";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function TicketDetailsPage() {
    const params = useParams();
    const locale = useLocale();

    const id = Number(params.id);

    const [data, setData] =
        useState<Awaited<
            ReturnType<typeof getUserReservedSession>
        > | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        if (!Number.isInteger(id)) {
            setError("Invalid session id.");
            setIsLoading(false);
            return;
        }

        async function fetchBooking() {
            try {
                setIsLoading(true);
                setError(null);

                const response =
                    await getUserReservedSession(
                        id,
                        locale,
                    );

                if (!response.success) {
                    setError(response.message);
                    return;
                }

                console.log(response.data)

                setData(response);

            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load booking details."
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchBooking();
    }, [id, locale]);

    if (isLoading) {
        return (
            <main className="fcc min-h-[70vh]">
                <Loading size={55} className="h-screen w-full" />
            </main>
        );
    }

    if (error) {
        return (
            <main className="fcc min-h-[70vh] px-5">
                <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    const ticket = data?.data;

    if (!ticket) {
        return (
            <main className="fcc min-h-[70vh] px-5">
                <div className="text-center">
                    <p className="text-lg text-black-light-utility">
                        Ticket not found.
                    </p>
                </div>
            </main>
        );
    }

    const seats = ticket.seats ?? [];
    const hasSeats = seats.length > 0;

    const startDate = new Date(ticket.startAt);

    const formattedDate =
        startDate.toLocaleDateString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            },
        );

    const formattedTime =
        startDate.toLocaleTimeString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
            },
        );

    return (
        <main className="min-h-screen bg-[#faf8f5] px-4 py-8 sm:px-6 lg:px-10">

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">

                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gold-utility" />

                        <span className="text-sm font-medium tracking-wide text-black-light-utility">
                            Loghanteh Tickets
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-crimson sm:text-4xl">
                        Ticket Details
                    </h1>

                    <p className="mt-2 text-sm text-black-light-utility">
                        Your reservation information and digital ticket.
                    </p>

                </div>

                {/* Ticket */}
                <article className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_15px_50px_rgba(92,33,39,0.08)]">

                    {/* Ticket Header */}
                    <div className="relative overflow-hidden bg-crimson px-6 py-7 text-white sm:px-8">

                        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/5" />

                        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-gold-opacity" />

                        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                                <div className="mb-3 flex items-center gap-2">

                                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wider text-white/80">
                                        DIGITAL TICKET
                                    </span>

                                    <span className="h-1.5 w-1.5 rounded-full bg-gold-utility" />

                                </div>

                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    {ticket.name}
                                </h2>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                                    {ticket.description}
                                </p>

                            </div>

                            <div className="shrink-0">

                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">

                                    <span className="block text-[10px] uppercase tracking-widest text-white/50">
                                        Session
                                    </span>

                                    <span className="mt-1 block text-lg font-bold">
                                        #{ticket.sessionId}
                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Ticket Body */}
                    <div className="p-6 sm:p-8">

                        {/* Main Information */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                            <div className="rounded-2xl bg-[#faf8f5] p-4">
                                <span className="text-xs text-black-light-utility">
                                    Date
                                </span>

                                <p className="mt-2 font-semibold text-black-utility">
                                    {formattedDate}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#faf8f5] p-4">
                                <span className="text-xs text-black-light-utility">
                                    Time
                                </span>

                                <p className="mt-2 font-semibold text-black-utility">
                                    {formattedTime}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#faf8f5] p-4">
                                <span className="text-xs text-black-light-utility">
                                    Duration
                                </span>

                                <p className="mt-2 font-semibold text-black-utility">
                                    {ticket.duration} min
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#faf8f5] p-4">

                                <span className="text-xs text-black-light-utility">
                                    Status
                                </span>

                                <div className="mt-2 flex items-center gap-2">

                                    <span className="h-2 w-2 rounded-full bg-gold-utility" />

                                    <span className="font-semibold text-crimson">
                                        Confirmed
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Event Information */}
                        <div className="mt-8">

                            <div className="mb-4 flex items-center justify-between">

                                <h3 className="text-lg font-bold text-black-utility">
                                    Event Information
                                </h3>

                                <span className="ml-4 h-px flex-1 bg-black/5" />

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-black/5 p-4">

                                    <span className="text-xs text-black-light-utility">
                                        Event
                                    </span>

                                    <p className="mt-1 font-semibold text-black-utility">
                                        {ticket.name}
                                    </p>

                                </div>

                                <div className="rounded-2xl border border-black/5 p-4">

                                    <span className="text-xs text-black-light-utility">
                                        Hall
                                    </span>

                                    <p className="mt-1 font-semibold text-black-utility">
                                        Hall #{ticket.hallId}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Seats */}
                        {hasSeats ? (
                            <div className="mt-8">

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="text-lg font-bold text-black-utility">
                                        Reserved Seats
                                    </h3>

                                    <span className="rounded-full bg-gold-opacity px-3 py-1 text-xs font-semibold text-crimson">
                                        {seats.length} Seats
                                    </span>

                                </div>

                                <div className="flex flex-wrap gap-3">

                                    {seats.map((seat) => (
                                        <div
                                            key={seat.seatId}
                                            className="fcc min-w-18 rounded-xl border border-gold-opacity bg-gold-opacity px-4 py-3"
                                        >

                                            <span className="text-xs text-black-light-utility">
                                                Row {seat.rowLabel}
                                            </span>

                                            <span className="mt-1 text-lg font-bold text-crimson">
                                                {seat.seatNumber}
                                            </span>

                                        </div>
                                    ))}

                                </div>

                            </div>
                        ) : (
                            <div className="mt-8 rounded-2xl border border-dashed border-black/10 bg-[#faf8f5] p-5">

                                <div className="flex items-center gap-4">

                                    <div className="fcc h-11 w-11 shrink-0 rounded-full bg-gold-opacity">
                                        <span className="text-lg text-gold-utility">
                                            ✓
                                        </span>
                                    </div>

                                    <div>

                                        <p className="font-semibold text-black-utility">
                                            General Admission
                                        </p>

                                        <p className="mt-1 text-sm text-black-light-utility">
                                            This ticket does not have assigned seats.
                                        </p>

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* Divider */}
                        <div className="relative my-8">

                            <div className="border-t border-dashed border-black/15" />

                            <span className="absolute -left-10 -top-3 h-6 w-6 rounded-full bg-[#faf8f5] sm:-left-11" />

                            <span className="absolute -right-10 -top-3 h-6 w-6 rounded-full bg-[#faf8f5] sm:-right-11" />

                        </div>

                        {/* Bottom */}
                        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">

                            <div>

                                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">

                                    <div>
                                        <span className="text-xs text-black-light-utility">
                                            Event ID
                                        </span>

                                        <p className="mt-1 text-sm font-semibold text-black-utility">
                                            #{ticket.eventId}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-black-light-utility">
                                            Tickets
                                        </span>

                                        <p className="mt-1 text-sm font-semibold text-black-utility">
                                            {hasSeats
                                                ? seats.length
                                                : 1}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-black-light-utility">
                                            Price
                                        </span>

                                        <p className="mt-1 font-bold text-crimson">
                                            {Number(
                                                ticket.price * ticket.quantity,
                                            ).toLocaleString(
                                                locale === "fa"
                                                    ? "fa-IR"
                                                    : "en-US"
                                            )}{" "}
                                            <span className="text-xs font-normal">
                                                IRR
                                            </span>
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 rounded-xl bg-crimson px-4 py-3">

                                    <p className="text-xs leading-5 text-white/70">
                                        Please keep this ticket available when
                                        entering the venue.
                                    </p>

                                </div>

                            </div>

                            {/* QR UI */}
                            <div className="fcc flex-col">

                                <div className="relative rounded-2xl border border-black/5 bg-white p-3 shadow-sm">

                                    <div
                                        className={cn(
                                            "grid h-36 w-36 grid-cols-7 grid-rows-7 gap-1",
                                            "rounded-lg bg-white",
                                        )}
                                    >
                                        {Array.from({
                                            length: 49,
                                        }).map((_, index) => {

                                            const active =
                                                (
                                                    index * 17 +
                                                    ticket.sessionId
                                                ) %
                                                5 !==
                                                0;

                                            return (
                                                <span
                                                    key={index}
                                                    className={cn(
                                                        "rounded-[1px]",
                                                        active
                                                            ? "bg-black-utility"
                                                            : "bg-transparent",
                                                    )}
                                                />
                                            );
                                        })}
                                    </div>

                                    <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-gold-utility" />

                                    <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-crimson" />

                                </div>

                                <p className="mt-3 text-center text-xs text-black-light-utility">
                                    Scan your ticket
                                </p>

                            </div>

                        </div>

                    </div>

                </article>

            </div>
        </main>
    );
}

export default TicketDetailsPage;