import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if user is authorized to view this booking
    if (booking.userId !== user.id && booking.property.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Parse JSON strings
    const bookingWithParsedData = {
      ...booking,
      property: {
        ...booking.property,
        amenities: booking.property.amenities ? JSON.parse(booking.property.amenities) : [],
        images: booking.property.images ? JSON.parse(booking.property.images) : [],
      },
    }

    return NextResponse.json(bookingWithParsedData)
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if booking exists and belongs to user
    const existingBooking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        property: true,
      },
    })

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const body = await request.json()
    const { status } = body

    // Only property owner can confirm/cancel bookings
    if (status && (status === "CONFIRMED" || status === "CANCELLED")) {
      if (existingBooking.property.userId !== user.id && user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }
    } else if (existingBooking.userId !== user.id && user.role !== "ADMIN") {
      // For other updates, only the booking owner can modify
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update booking
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

