import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPinIcon, UsersIcon } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    description: string
    location: string
    price: number
    priceUnit: string
    type: string
    capacity?: number | null
    images: string[]
    createdAt: Date
    averageRating?: number
    reviewCount?: number
  }
  showLocation?: boolean
}

export function PropertyCard({ property, showLocation = true }: PropertyCardProps) {
  const { id, title, location, price, priceUnit, type, capacity, images, createdAt, averageRating, reviewCount } =
    property

  const typeLabels: Record<string, string> = {
    event: "Event Space",
    meeting: "Meeting Room",
    party: "Party Venue",
    office: "Virtual Office",
    commercial: "Commercial",
    residential: "Residential",
  }

  const priceUnitLabels: Record<string, string> = {
    hour: "/hour",
    day: "/day",
    month: "/month",
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/properties/${id}`} className="block">
        <div className="aspect-[16/9] relative">
          <Image src={images[0] || "/placeholder.svg?height=225&width=400"} alt={title} fill className="object-cover" />
          <Badge className="absolute left-2 top-2 z-10">{typeLabels[type] || type}</Badge>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold line-clamp-1">{title}</h3>
              {averageRating !== undefined && (
                <div className="flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 fill-current text-yellow-500" />
                  <span className="text-sm font-medium">
                    {averageRating.toFixed(1)}
                    {reviewCount !== undefined && <span className="text-muted-foreground"> ({reviewCount})</span>}
                  </span>
                </div>
              )}
            </div>
            {showLocation && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPinIcon className="mr-1 h-4 w-4" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
            {capacity && (
              <div className="flex items-center text-sm text-muted-foreground">
                <UsersIcon className="mr-1 h-4 w-4" />
                <span>Up to {capacity} people</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
          <div className="font-medium">
            ${price}
            <span className="text-sm text-muted-foreground">{priceUnitLabels[priceUnit] || `/${priceUnit}`}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Listed {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

