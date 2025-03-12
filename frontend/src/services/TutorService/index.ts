"use server";

import { cookies } from "next/headers";

const tutorInfo = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tutor/me`, {
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
    console.error("Failed to fetch tutor info:", error);
    throw error;
  }
};

export default tutorInfo;
