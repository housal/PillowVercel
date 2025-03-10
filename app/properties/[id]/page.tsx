import { notFound } from "next/navigation"
import Image from "next/image"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { BookingForm } from "@/components/booking/booking-form"
import { PropertyAmenities } from "@/components/property/property-amenities"
import { PropertyReviews } from "@/components/property/property-reviews"
import { PropertyHost } from "@/components/property/property-host"
import { PropertyAvailability } from "@/components/property/property-availability"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPinIcon, UsersIcon, SquareIcon, BedIcon, ShowerHeadIcon as ShowerIcon, StarIcon } from "lucide-react"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
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
    notFound()
  }

  // Calculate average rating
  const totalRatings = property.reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = property.reviews.length > 0 ? totalRatings / property.reviews.length : 0

  // Parse JSON strings
  const amenities = property.amenities ? JSON.parse(property.amenities) : []
  const images = property.images ? JSON.parse(property.images) : []

  // Get current user
  const user = await getCurrentUser()

  // Check if current user is the owner
  const isOwner = user?.id === property.userId

  const typeLabels: Record<string, string> = {
    event: "Event Space",
    meeting: "Meeting Room",
    party: "Party Venue",
    office: "Virtual Office",
    commercial: "Commercial Space",
    residential: "Residential Property",
  }

  const priceUnitLabels: Record<string, string> = {
    hour: "/hour",
    day: "/day",
    month: "/month",
  }

  return (
    <main className="container py-6 md:py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <Badge className="mb-2">{typeLabels[property.type] || property.type}</Badge>
              <h1 className="text-2xl font-bold md:text-3xl">{property.title}</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                {property.reviews.length > 0 && (
                  <div className="flex items-center text-sm">
                    <StarIcon className="mr-1 h-4 w-4 fill-current text-yellow-500" />
                    <span>
                      {averageRating.toFixed(1)} · {property.reviews.length} review
                      {property.reviews.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={images[0] || "/placeholder.svg?height=300&width=400"}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {property.capacity && (
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-sm text-muted-foreground">Up to {property.capacity} people</p>
                  </div>
                </div>
              )}
              {property.size && (
                <div className="flex items-center gap-2">
                  <SquareIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Size</p>
                    <p className="text-sm text-muted-foreground">{property.size} sq ft</p>
                  </div>
                </div>
              )}
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <BedIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Bedrooms</p>
                    <p className="text-sm text-muted-foreground">
                      {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2">
                  <ShowerIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Bathrooms</p>
                    <p className="text-sm text-muted-foreground">
                      {property.bathrooms} bathroom{property.bathrooms !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold">About this space</h2>
              <p className="mt-2 whitespace-pre-line">{property.description}</p>
            </div>

            {amenities.length > 0 && (
              <>
                <Separator />
                <PropertyAmenities amenities={amenities} />
              </>
            )}

            {property.availability.length > 0 && (
              <>
                <Separator />
                <PropertyAvailability availability={property.availability} />
              </>
            )}

            <Separator />

            <PropertyHost host={property.user} />

            {property.reviews.length > 0 && (
              <>
                <Separator />
                <PropertyReviews reviews={property.reviews} averageRating={averageRating} />
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <div className="rounded-lg border p-4 shadow-sm">
              <div className="mb-4">
                <div className="text-2xl font-bold">
                  ${property.price}
                  <span className="text-base font-normal text-muted-foreground">
                    {priceUnitLabels[property.priceUnit] || `/${property.priceUnit}`}
                  </span>
                </div>
              </div>

              {!isOwner ? (
                <BookingForm
                  propertyId={property.id}
                  propertyType={property.type}
                  pricePerUnit={property.price}
                  priceUnit={property.priceUnit}
                  cleaningFee={25}
                  serviceFee={15}
                  capacity={property.capacity || undefined}
                />
              ) : (
                <div className="text-center p-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground">This is your property</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

