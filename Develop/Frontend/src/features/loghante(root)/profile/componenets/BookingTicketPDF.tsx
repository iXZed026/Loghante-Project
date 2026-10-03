import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import QRCode from 'qrcode'

import { BookingPDFData } from '../types/booking-pdf.types'

const QR_CODE_URL = 'https://next-mart-shop.vercel.app/'

const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: '#F5F3EF',
    fontFamily: 'Helvetica',
    color: '#242424',
  },

  header: {
    backgroundColor: '#252525',
    padding: 18,
    borderRadius: 8,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerContent: {
    flex: 1,
    paddingRight: 15,
  },

  brand: {
    color: '#D6B477',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 7,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },

  subtitle: {
    color: '#D0D0D0',
    fontSize: 8,
    lineHeight: 1.4,
  },

  qrWrapper: {
    width: 74,
    height: 74,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },

  qrCode: {
    width: 64,
    height: 64,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#967541',
    marginBottom: 11,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  infoItem: {
    width: '50%',
    paddingRight: 8,
    marginBottom: 11,
  },

  label: {
    fontSize: 7.5,
    color: '#858585',
    marginBottom: 4,
  },

  value: {
    fontSize: 9,
    color: '#252525',
  },

  description: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#626262',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAE7E0',
    marginVertical: 10,
  },

  seatHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F3EF',
    padding: 7,
    borderRadius: 4,
  },

  seatRow: {
    flexDirection: 'row',
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  seatCell: {
    flex: 1,
    fontSize: 8.5,
    color: '#333333',
  },

  seatHeaderText: {
    flex: 1,
    fontSize: 7.5,
    fontWeight: 700,
    color: '#686868',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 9,
    color: '#686868',
  },

  totalValue: {
    fontSize: 15,
    fontWeight: 700,
    color: '#967541',
  },

  footer: {
    textAlign: 'center',
    fontSize: 7.5,
    lineHeight: 1.5,
    color: '#858585',
    marginTop: 2,
  },
})

function formatDate(date?: string) {
  if (!date) return 'Not specified'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Not specified'
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(parsedDate)
}

function formatPrice(value: number | string) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return String(value)

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(amount)
}

function InfoItem({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default function BookingTicketPDF({
  booking,
}: {
  booking: BookingPDFData
}) {
  const seats = booking.seats ?? []

  const qrCode = QRCode.toDataURL(QR_CODE_URL, {
    width: 200,
    margin: 0,
    errorCorrectionLevel: 'M',
  })

  return (
    <Document
      title={`Loghanteh Booking ${booking.bookingId}`}
      author="Loghanteh"
      subject="Booking confirmation"
    >
      <Page size="A4" style={styles.page}>
        {/* Header + QR Code */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.brand}>LOGHANTEH</Text>

            <Text style={styles.title}>
              Booking Confirmation
            </Text>

            <Text style={styles.subtitle}>
              Your booking details and reservation information.
            </Text>
          </View>

          <View style={styles.qrWrapper}>
            <Image
              src={qrCode}
              style={styles.qrCode}
            />
          </View>
        </View>

        {/* Booking Information */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            BOOKING INFORMATION
          </Text>

          <View style={styles.infoGrid}>
            <InfoItem
              label="Booking ID"
              value={booking.bookingId}
            />

            <InfoItem
              label="Session ID"
              value={booking.sessionId ?? '-'}
            />

            <InfoItem
              label="Event"
              value={booking.name}
            />

            <InfoItem
              label="Event Type"
              value={booking.eventTypeName ?? '-'}
            />

            <InfoItem
              label="Date & Time"
              value={formatDate(booking.startAt)}
            />

            <InfoItem
              label="Duration"
              value={
                booking.duration != null
                  ? `${booking.duration} minutes`
                  : '-'
              }
            />

            <InfoItem
              label="Hall"
              value={booking.hallName ?? '-'}
            />

            <InfoItem
              label="Quantity"
              value={booking.quantity}
            />
          </View>

          {booking.description ? (
            <>
              <View style={styles.divider} />

              <Text style={styles.label}>
                DESCRIPTION
              </Text>

              <Text style={styles.description}>
                {booking.description}
              </Text>
            </>
          ) : null}
        </View>

        {/* Seats */}
        {seats.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              RESERVED SEATS
            </Text>

            <View style={styles.seatHeader}>
              <Text style={styles.seatHeaderText}>
                Row
              </Text>

              <Text style={styles.seatHeaderText}>
                Seat
              </Text>

              <Text style={styles.seatHeaderText}>
                Status
              </Text>
            </View>

            {seats.map((seat) => (
              <View
                key={seat.seatId}
                style={styles.seatRow}
              >
                <Text style={styles.seatCell}>
                  {seat.rowLabel}
                </Text>

                <Text style={styles.seatCell}>
                  {seat.seatNumber}
                </Text>

                <Text style={styles.seatCell}>
                  {seat.status}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Payment */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            PAYMENT SUMMARY
          </Text>

          <View style={styles.infoGrid}>
            <InfoItem
              label="Unit Price"
              value={formatPrice(booking.price)}
            />

            <InfoItem
              label="Ticket Quantity"
              value={booking.quantity}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Price
            </Text>

            <Text style={styles.totalValue}>
              {formatPrice(booking.totalPrice)}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for choosing Loghanteh.
          {'\n'}
          Please keep this document for your records.
        </Text>
      </Page>
    </Document>
  )
}