import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    // Build filter
    const filter: any = { userId: user.id }
    if (status) filter.status = status

    const bookings = await prisma.booking.findMany({
      where: filter,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            location: true,
            images: true,
            type: true,
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    })

    // Parse JSON strings
    const bookingsWithParsedData = bookings.map((booking) => ({
      ...booking,
      property: {
        ...booking.property,
        images: booking.property.images ? JSON.parse(booking.property.images) : [],
      },
    }))

    return NextResponse.json(bookingsWithParsedData)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { propertyId, startDate, endDate, totalPrice, guestCount, notes } = body

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Check if dates are available
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        propertyId,
        status: { in: ["PENDING", "CONFIRMED"] },
        OR: [
          {
            startDate: { lte: new Date(startDate) },
            endDate: { gte: new Date(startDate) },
          },
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(endDate) },
          },
          {
            startDate: { gte: new Date(startDate) },
            endDate: { lte: new Date(endDate) },
          },
        ],
      },
    })

    if (overlappingBookings.length > 0) {
      return NextResponse.json({ error: "The selected dates are not available" }, { status: 400 })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        propertyId,
        userId: user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        guestCount,
        notes,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

