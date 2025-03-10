import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        availability: true,
      },
    })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Calculate average rating
    const totalRatings = property.reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = property.reviews.length > 0 ? totalRatings / property.reviews.length : 0

    // Parse JSON strings
    const propertyWithParsedData = {
      ...property,
      averageRating,
      reviewCount: property.reviews.length,
      amenities: property.amenities ? JSON.parse(property.amenities) : [],
      images: property.images ? JSON.parse(property.images) : [],
    }

    return NextResponse.json(propertyWithParsedData)
  } catch (error) {
    console.error("Error fetching property:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id },
    })

    if (!existingProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    if (existingProperty.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      location,
      price,
      priceUnit,
      type,
      capacity,
      size,
      bedrooms,
      bathrooms,
      amenities,
      images,
      availability,
    } = body

    // Update property
    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        title,
        description,
        location,
        price,
        priceUnit,
        type,
        capacity,
        size,
        bedrooms,
        bathrooms,
        amenities: JSON.stringify(amenities),
        images: JSON.stringify(images),
      },
    })

    // Update availability if provided
    if (availability && Array.isArray(availability)) {
      // Delete existing availability
      await prisma.availability.deleteMany({
        where: { propertyId: params.id },
      })

      // Create new availability
      await prisma.availability.createMany({
        data: availability.map((avail) => ({
          propertyId: property.id,
          dayOfWeek: avail.dayOfWeek,
          startTime: avail.startTime,
          endTime: avail.endTime,
        })),
      })
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error("Error updating property:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id },
    })

    if (!existingProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    if (existingProperty.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Delete property (cascades to availability, bookings, reviews)
    await prisma.property.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting property:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

