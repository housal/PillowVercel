import { prisma } from "@/lib/db"
import { PropertyCard } from "@/components/property/property-card"

interface SearchResultsProps {
  searchParams: {
    q?: string
    type?: string
    location?: string
    minPrice?: string
    maxPrice?: string
    capacity?: string
  }
}

export async function SearchResults({ searchParams }: SearchResultsProps) {
  const { q, type, location, minPrice, maxPrice, capacity } = searchParams

  // Build filter
  const filter: any = {}

  if (q) {
    filter.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
    ]
  }

  if (type) filter.type = type
  if (location) filter.location = { contains: location, mode: "insensitive" }

  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.gte = Number.parseFloat(minPrice)
    if (maxPrice) filter.price.lte = Number.parseFloat(maxPrice)
  }

  if (capacity) filter.capacity = { gte: Number.parseInt(capacity) }

  // Fetch properties
  const properties = await prisma.property.findMany({
    where: filter,
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Calculate average ratings
  const propertiesWithRatings = properties.map((property) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {propertiesWithRatings.length} {propertiesWithRatings.length === 1 ? "result" : "results"}
        </h2>
      </div>

      {propertiesWithRatings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesWithRatings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-medium">No properties found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search filters or browse all properties.</p>
        </div>
      )}
    </div>
  )
}

