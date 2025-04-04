"use server";

import { cookies } from "next/headers";

export const getCart = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const cart = await res.json();

    return cart;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (tutorId: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ tutorId }),
    });

    console.log(res);

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const cart = await res.json();

    return cart;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (cartId: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/cart/${cartId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const cart = await res.json();

    return cart;
  } catch (error) {
    throw error;
  }
};
