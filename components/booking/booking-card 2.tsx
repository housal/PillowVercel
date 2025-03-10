import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BookingCardProps {
  booking: {
    id: string
    startDate: Date
    endDate: Date
    totalPrice: number
    status: string
    property: {
      id: string
      title: string
      location: string
      type: string
      images: string[]
    }
  }
}

export function BookingCard({ booking }: BookingCardProps) {
  const { id, startDate, endDate, totalPrice, status, property } = booking

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

  return (
    <Card className="overflow-hidden">
      <Link href={`/bookings/${id}`} className="block">
        <div className="aspect-[16/9] relative">
          <Image
            src={property.images[0] || "/placeholder.svg?height=225&width=400"}
            alt={property.title}
            fill
            className="object-cover"
          />
          <Badge className={`absolute right-2 top-2 z-10 ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
            {statusLabels[status] || status}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold line-clamp-1">{property.title}</h3>
            <div className="text-sm text-muted-foreground line-clamp-1">{property.location}</div>
            <div className="text-sm">
              <span className="font-medium">Dates:</span> {format(new Date(startDate), "MMM d, yyyy")} -{" "}
              {format(new Date(endDate), "MMM d, yyyy")}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
          <div className="font-medium">${totalPrice.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Booked on {format(new Date(startDate), "MMM d, yyyy")}</div>
        </CardFooter>
      </Link>
    </Card>
  )
}

