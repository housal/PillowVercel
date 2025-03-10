import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  priceUnit: string
  type: "event" | "meeting" | "party" | "office"
  rating: number
  reviewCount: number
  capacity: number
  imageUrl: string
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  priceUnit,
  type,
  rating,
  reviewCount,
  capacity,
  imageUrl,
}: PropertyCardProps) {
  const typeLabel = {
    event: "Event Space",
    meeting: "Meeting Room",
    party: "Party Venue",
    office: "Virtual Office",
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <Badge className="absolute top-2 left-2">{typeLabel[type]}</Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Up to {capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Available now</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">${price}</span>
          <span className="text-sm text-muted-foreground">/{priceUnit}</span>
        </div>
        <Button asChild>
          <Link href={`/spaces/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

