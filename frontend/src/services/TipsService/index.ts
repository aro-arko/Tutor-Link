"use server";

import { cookies } from "next/headers";

export const getTips = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const postTip = async (tip: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ tip }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
