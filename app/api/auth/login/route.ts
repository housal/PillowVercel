import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { comparePasswords, createSession } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
    }

    // Verify password
    const passwordMatch = await comparePasswords(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
    }

    // Create session
    await createSession(user.id)

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Login error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

