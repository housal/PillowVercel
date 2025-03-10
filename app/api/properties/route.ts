import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const capacity = searchParams.get("capacity")

    // Build filter
    const filter: any = {}

    if (type) filter.type = type
    if (location) filter.location = { contains: location }
    if (minPrice) filter.price = { ...filter.price, gte: Number.parseFloat(minPrice) }
    if (maxPrice) filter.price = { ...filter.price, lte: Number.parseFloat(maxPrice) }
    if (capacity) filter.capacity = { gte: Number.parseInt(capacity) }

    const properties = await prisma.property.findMany({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Calculate average rating
    const propertiesWithRating = properties.map((property) => {
      const totalRatings = property.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = property.reviews.length > 0 ? totalRatings / property.reviews.length : 0

      return {
        ...property,
        averageRating,
        reviewCount: property.reviews.length,
        // Parse JSON strings
        amenities: property.amenities ? JSON.parse(property.amenities) : [],
        images: property.images ? JSON.parse(property.images) : [],
      }
    })

    return NextResponse.json(propertiesWithRating)
  } catch (error) {
    console.error("Error fetching properties:", error)
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

    // Create property
    const property = await prisma.property.create({
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
        userId: user.id,
      },
    })

    // Create availability if provided
    if (availability && Array.isArray(availability)) {
      await prisma.availability.createMany({
        data: availability.map((avail) => ({
          propertyId: property.id,
          dayOfWeek: avail.dayOfWeek,
          startTime: avail.startTime,
          endTime: avail.endTime,
        })),
      })
    }

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

