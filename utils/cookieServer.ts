"use server";
import { cookies } from "next/headers";
export const getCookieServer = async (
  cookieName: string,
): Promise<string | undefined> => {
  const storedCookie = await cookies();
  const cookie = storedCookie.get(cookieName)?.value;
  return cookie;
};
