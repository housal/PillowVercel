import { PropertyCard } from "@/components/property-card"

export function FeaturedSpaces() {
  // This would typically come from an API or database
  const featuredProperties = [
    {
      id: "1",
      title: "Modern Downtown Conference Center",
      location: "San Francisco, CA",
      price: 150,
      priceUnit: "hour",
      type: "event" as const,
      rating: 4.9,
      reviewCount: 128,
      capacity: 200,
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "Executive Boardroom with City Views",
      location: "New York, NY",
      price: 75,
      priceUnit: "hour",
      type: "meeting" as const,
      rating: 4.8,
      reviewCount: 94,
      capacity: 12,
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "3",
      title: "Luxury Rooftop Event Space",
      location: "Miami, FL",
      price: 2500,
      priceUnit: "day",
      type: "party" as const,
      rating: 4.7,
      reviewCount: 56,
      capacity: 150,
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "Premium Virtual Office Suite",
      location: "Chicago, IL",
      price: 350,
      priceUnit: "month",
      type: "office" as const,
      rating: 4.6,
      reviewCount: 42,
      capacity: 5,
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Spaces</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover our most popular commercial spaces for your next event or business need.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  )
}

