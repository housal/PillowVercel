import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { prisma } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, UsersIcon, MessageSquareIcon } from "lucide-react"
import { CancelBookingButton } from "@/components/booking/cancel-booking-button"

interface BookingPageProps {
  params: {
    id: string
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
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
              image: true,
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
  if (booking.userId !== user.id && booking.property.userId !== user.id) {
    redirect("/dashboard")
  }

  // Parse JSON strings
  const propertyImages = booking.property.images ? JSON.parse(booking.property.images) : []

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    COMPLETED: "bg-blue-100 text-blue-800",
  }

  const statusLabels: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
  }

  const isGuest = booking.userId === user.id
  const isHost = booking.property.userId === user.id
  const canCancel = isGuest && (booking.status === "PENDING" || booking.status === "CONFIRMED")

  return (
    <main className="container max-w-3xl py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Booking Details</h1>
        <Badge className={`${statusColors[booking.status] || "bg-gray-100 text-gray-800"}`}>
          {statusLabels[booking.status] || booking.status}
        </Badge>
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
                <Link href={`/properties/${booking.property.id}`} className="hover:underline">
                  <h2 className="text-xl font-bold">{booking.property.title}</h2>
                </Link>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  <span>{booking.property.location}</span>
                </div>
              </div>

              <Separator />

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

              <Separator />

              <div className="space-y-1">
                <p className="font-medium">{isGuest ? "Host Information" : "Guest Information"}</p>
                <p className="text-sm">{isGuest ? booking.property.user.name : user.name}</p>
                <p className="text-sm text-muted-foreground">{isGuest ? booking.property.user.email : user.email}</p>
              </div>

              {booking.notes && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <p className="font-medium">Special Requests</p>
                    <p className="text-sm">{booking.notes}</p>
                  </div>
                </>
              )}
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
              <span>Booking ID</span>
              <span>{booking.id}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Booked on</span>
              <span>{format(new Date(booking.createdAt), "MMM d, yyyy")}</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            {canCancel && <CancelBookingButton bookingId={booking.id} />}

            <Button variant="outline" asChild>
              <Link href={`/messages/${isGuest ? booking.property.userId : booking.userId}`}>
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                {isGuest ? "Contact Host" : "Contact Guest"}
              </Link>
            </Button>

            <Button asChild>
              <Link href="/dashboard/bookings">View All Bookings</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

