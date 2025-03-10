import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { prisma } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2Icon, CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"

interface BookingConfirmationPageProps {
  params: {
    id: string
  }
}

export default async function BookingConfirmationPage({ params }: BookingConfirmationPageProps) {
  const user = await requireAuth()

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
            },
          },
        },
      },
    },
  })

  if (!booking) {
    notFound()
  }

  // Check if user is authorized to view this booking
  if (booking.userId !== user.id) {
    redirect("/dashboard")
  }

  // Parse JSON strings
  const propertyImages = booking.property.images ? JSON.parse(booking.property.images) : []

  return (
    <main className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle2Icon className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">Your booking has been confirmed and is awaiting host approval.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src={propertyImages[0] || "/placeholder.svg?height=300&width=400"}
                alt={booking.property.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">{booking.property.title}</h2>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  <span>{booking.property.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(booking.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                {booking.guestCount && (
                  <div className="flex items-center">
                    <UsersIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Guests</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.guestCount} {booking.guestCount === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <p className="font-medium">Host Information</p>
                <p className="text-sm">{booking.property.user.name}</p>
                <p className="text-sm text-muted-foreground">{booking.property.user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col border-t p-6">
          <div className="mb-4 w-full space-y-2">
            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="font-medium">${booking.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Status</span>
              <span className="capitalize">{booking.status.toLowerCase()}</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" asChild>
              <Link href={`/bookings/${booking.id}`}>View Booking Details</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/bookings">View All Bookings</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="text-center">
        <p className="mb-4 text-muted-foreground">A confirmation email has been sent to your email address.</p>
        <Button variant="outline" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </main>
  )
}

