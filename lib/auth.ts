import { cookies } from "next/headers"
import { prisma } from "@/lib/db"
import { compare, hash } from "bcrypt"
import { SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation"

const secretKey = process.env.JWT_SECRET || "your-secret-key"
const key = new TextEncoder().encode(secretKey)

export async function hashPassword(password: string) {
  return hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expires.getTime() / 1000)
    .sign(key)

  cookies().set("session", session, {
    expires,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return session
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null

  try {
    const { payload } = await jwtVerify(session, key)
    return payload
  } catch (error) {
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session?.userId) return null

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  })

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return user
}

export async function logout() {
  cookies().delete("session")
}

