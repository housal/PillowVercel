import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { propertyId, rating, content } = body

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Check if user has a completed booking for this property
    const hasCompletedBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        userId: user.id,
        status: "COMPLETED",
      },
    })

    if (!hasCompletedBooking) {
      return NextResponse.json({ error: "You can only review properties you have stayed at" }, { status: 400 })
    }

    // Check if user has already reviewed this property
    const existingReview = await prisma.review.findFirst({
      where: {
        propertyId,
        userId: user.id,
      },
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this property" }, { status: 400 })
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        propertyId,
        userId: user.id,
        rating,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

