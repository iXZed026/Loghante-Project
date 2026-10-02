
'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'

import BookingTicketPDF from './BookingTicketPDF'
import type { BookingPDFData } from '../types/booking-pdf.types'

export default function BookingPDFDownloadClient({
  booking,
}: {
  booking: BookingPDFData
}) {
  return (
    <PDFDownloadLink
      document={<BookingTicketPDF booking={booking} />}
      fileName={`loghanteh-booking-${booking.bookingId}.pdf`}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#967541] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#806338]"
    >
      {({ loading, error }) => (
        <span>
          {error
            ? 'PDF generation failed'
            : loading
              ? 'Preparing PDF...'
              : 'Download PDF'}
        </span>
      )}
    </PDFDownloadLink>
  )
}