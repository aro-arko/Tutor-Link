"use server";

import { cookies } from "next/headers";

interface BookingData {
  tutorId: string;
  subject: string;
  timeSlotId: string;
  sessionStartDate: string;
  sessionEndDate: string;
}

export const createBooking = async (data: BookingData) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log(res);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const booking = await res.json();
    return booking;
  } catch (error) {
    // console.error("Failed to create booking:", error);
    throw error;
  }
};

export const studentBookings = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const bookings = await res.json();
    return bookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};

export const studentCancelBooking = async (bookingId: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/cancel/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const booking = await res.json();
    return booking;
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    throw error;
  }
};

export const verifyPayment = async (order_id: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/verify?order_id=${order_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const booking = await res.json();
    return booking;
  } catch (error) {
    console.error("Failed to verify payment:", error);
    throw error;
  }
};

export const tutorBookings = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const bookings = await res.json();
    return bookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};

export const bookingApproval = async (
  bookingId: string,
  updatedData: string
) => {
  const token = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ approvalStatus: updatedData }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const booking = await res.json();
    return booking;
  } catch (error) {
    console.error("Failed to approve booking:", error);
    throw error;
  }
};
