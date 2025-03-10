import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/db"
import { PropertyCard } from "@/components/property/property-card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { ArrowRightIcon } from "lucide-react"

export default async function HomePage() {
  // Fetch featured properties
  const featuredProperties = await prisma.property.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  })

  // Calculate average ratings
  const propertiesWithRatings = featuredProperties.map((property) => {
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
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image
          src="/placeholder.svg?height=600&width=1600"
          alt="Pillow & Space"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Find Your Perfect Space</h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Book unique spaces for meetings, events, or long-term stays. Find the perfect space for your needs.
          </p>
          <div className="w-full max-w-3xl rounded-lg bg-white/10 p-2 backdrop-blur-md">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Spaces</h2>
          <Button variant="outline" asChild>
            <Link href="/search">
              View All
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesWithRatings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">How Pillow & Space Works</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Find a Space</h3>
              <p className="text-muted-foreground">
                Browse our selection of unique spaces for any occasion, from meeting rooms to event venues.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Book Instantly</h3>
              <p className="text-muted-foreground">
                Reserve your space with our simple booking process. Secure payment and instant confirmation.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Enjoy Your Space</h3>
              <p className="text-muted-foreground">
                Show up and enjoy your perfectly suited space. Leave a review to help others find great spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-primary p-8 text-primary-foreground">
            <h3 className="mb-4 text-2xl font-bold">Looking for a Space?</h3>
            <p className="mb-6">
              Find the perfect space for your next meeting, event, or long-term stay. Browse thousands of unique spaces.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/search">Find a Space</Link>
            </Button>
          </div>

          <div className="rounded-lg bg-secondary p-8 text-secondary-foreground">
            <h3 className="mb-4 text-2xl font-bold">Have a Space to Share?</h3>
            <p className="mb-6">
              List your space on Pillow & Space and start earning. It's free to list and takes just minutes to get
              started.
            </p>
            <Button variant="default" asChild>
              <Link href="/properties/new">List Your Space</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

