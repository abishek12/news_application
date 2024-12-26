"use server";

import { cookies } from "next/headers";

export async function create(data) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: data,
    httpOnly: true,
  });
}

// get the token
export async function getAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return !!token;
}

export async function getToken(){
  const cookieStore = await cookies()
  const token = cookieStore.get("token")
  return token
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}