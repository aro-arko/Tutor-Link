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
