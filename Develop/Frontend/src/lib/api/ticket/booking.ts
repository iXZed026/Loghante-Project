import { fetcher } from "../fetcher";

export interface ICreateBookingData {
    sessionId: number;
    quantity: number;
}

export interface CreateBookingResponseData {
    bookingId: number;
    sessionId: number;
    quantity: number;
    totalPrice: string;
    purchasedAt: string;
}

export interface CreateBookingResponse {
    data: CreateBookingResponseData;
    message: string;
    success: boolean;
}

export async function createBooking(
    data: ICreateBookingData,
    locale: string,
): Promise<CreateBookingResponse> {

    return fetcher<CreateBookingResponse>(
        "/tickets/bookings",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}