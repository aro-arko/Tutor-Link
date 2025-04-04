/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const getMe = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/student/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch student info:", error);
    throw error;
  }
};

export const updateStudentProfile = async (studentData: any) => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(studentData),
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to update student profile:", error);
    throw error;
  }
};

export const searchTutors = async (
  queryParams: Record<string, string | number | string[]>
) => {
  try {
    const queryString = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryString.append(key, value.join(","));
      } else if (value !== undefined && value !== null && value !== "") {
        queryString.append(key, value.toString());
      }
    });
    console.log("Query String:", queryString.toString());

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/student/search?${queryString.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to search tutors:", error);
    return { success: false, message: "Failed to fetch tutors", data: [] };
  }
};
export const reviewTutor = async (tutorId: string, reviewData: any) => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/review/${tutorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(reviewData),
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to review tutor:", error);
    throw error;
  }
};

export const updateReview = async (reviewId: string, reviewData: any) => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/review/${reviewId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(reviewData),
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to update review:", error);
    throw error;
  }
};

export const getBookingById = async (bookingId: string) => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/booking/${bookingId}`,
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch booking by ID:", error);
    throw error;
  }
};
