import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export type Session = { userId: string; role: "PUBLIC" | "USER" | "ADMIN"; status: "PENDING" | "APPROVED" | "REJECTED" };

export async function signSession(payload: Session) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
}

export async function verifySession(token: string) {
  const data = await jwtVerify<Session>(token, secret);
  return data.payload;
}
