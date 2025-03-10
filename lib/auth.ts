import { cookies } from "next/headers"
import { prisma } from "@/lib/db"
import { SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation"
import { createHash, timingSafeEqual } from "crypto"

const secretKey = process.env.JWT_SECRET || "your-secret-key"
const key = new TextEncoder().encode(secretKey)

// Simple hash function using Node's crypto instead of bcrypt
export async function hashPassword(password: string) {
  const hash = createHash("sha256")
  hash.update(password)
  return hash.digest("hex")
}

// Compare passwords using timing-safe comparison
export async function comparePasswords(password: string, hashedPassword: string) {
  const hashedInput = await hashPassword(password)
  const inputBuffer = Buffer.from(hashedInput)
  const storedBuffer = Buffer.from(hashedPassword)

  // Ensure buffers are the same length for timingSafeEqual
  if (inputBuffer.length !== storedBuffer.length) {
    return false
  }

  try {
    return timingSafeEqual(inputBuffer, storedBuffer)
  } catch (error) {
    return false
  }
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

