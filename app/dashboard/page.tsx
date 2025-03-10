import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { PropertyCard } from "@/components/property/property-card"
import { BookingCard } from "@/components/booking/booking-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default async function DashboardPage() {
  const user = await requireAuth()

  // Fetch user's properties
  const properties = await prisma.property.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  })

  // Fetch user's bookings
  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  })

  // Parse JSON strings
  const parsedProperties = properties.map((property) => ({
    ...property,
    amenities: property.amenities ? JSON.parse(property.amenities) : [],
    images: property.images ? JSON.parse(property.images) : [],
  }))

  const parsedBookings = bookings.map((booking) => ({
    ...booking,
    property: {
      ...booking.property,
      images: booking.property.images ? JSON.parse(booking.property.images) : [],
    },
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <DashboardNav user={user} />
        <main className="flex w-full flex-col overflow-hidden p-1 md:p-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Welcome back, {user.name}!</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Your Properties</h3>
                <Button asChild size="sm">
                  <Link href="/properties/new">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    List a Property
                  </Link>
                </Button>
              </div>

              {parsedProperties.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {parsedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-medium">No properties yet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Start earning by listing your space on Pillow & Space.
                  </p>
                  <Button asChild>
                    <Link href="/properties/new">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      List Your First Property
                    </Link>
                  </Button>
                </div>
              )}

              {parsedProperties.length > 0 && (
                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/properties">View All Properties</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Bookings</h3>

              {parsedBookings.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {parsedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-medium">No bookings yet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Browse properties and make your first booking.</p>
                  <Button asChild>
                    <Link href="/search">Find a Space</Link>
                  </Button>
                </div>
              )}

              {parsedBookings.length > 0 && (
                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/bookings">View All Bookings</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

