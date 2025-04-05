"use server";

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
