"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const CART_TAG = "cart";

export const getCart = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_API}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      next: {
        tags: [CART_TAG],
      },
    });
    const cart = await res.json();

    return cart;
  } catch (error) {
    console.error("Failed to get cart", error);
    throw error;
  }
};

export const addToCart = async (tutorId: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ tutorId }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const cart = await res.json();

    revalidateTag(CART_TAG);

    return cart;
  } catch (error) {
    console.error("Failed to add to cart", error);
    throw error;
  }
};

export const removeFromCart = async (cartId: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_API}/cart/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const cart = await res.json();

    revalidateTag(CART_TAG);

    return cart;
  } catch (error) {
    console.error("Failed to remove from cart", error);
    throw error;
  }
};
