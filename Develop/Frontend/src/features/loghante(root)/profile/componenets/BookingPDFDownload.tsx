
'use client'

import dynamic from 'next/dynamic'

import type { BookingPDFData } from '../types/booking-pdf.types'

const BookingPDFDownloadClient = dynamic(
  () => import('./BookingPDFDownloadClient'),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        disabled
        className="rounded-lg bg-gray-300 px-5 py-3 text-sm text-gray-600"
      >
        Preparing PDF...
      </button>
    ),
  },
)

export default function BookingPDFDownload({
  booking,
}: {
  booking: BookingPDFData
}) {
  return <BookingPDFDownloadClient booking={booking} />
}