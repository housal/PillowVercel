import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronLeft, Filter, MapPin, Search, SlidersHorizontal, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"

export default function ShortTermPage() {
  // Mock data for properties
  const properties = [
    {
      id: "1",
      title: "Modern Downtown Conference Center",
      location: "San Francisco, CA",
      price: 150,
      priceUnit: "hour",
      type: "event",
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
      type: "meeting",
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
      type: "party",
      rating: 4.7,
      reviewCount: 56,
      capacity: 150,
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "Cozy Meeting Room in Business District",
      location: "Chicago, IL",
      price: 50,
      priceUnit: "hour",
      type: "meeting",
      rating: 4.6,
      reviewCount: 42,
      capacity: 8,
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  ]

  const typeLabel = {
    event: "Event Space",
    meeting: "Meeting Room",
    party: "Party Venue",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo className="h-8" />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/long-term" className="text-sm font-medium hover:underline underline-offset-4">
              Long-Term Leases
            </Link>
            <Link href="/short-term" className="text-sm font-medium hover:underline underline-offset-4">
              Short-Term Stays
            </Link>
            <Link href="/virtual-office" className="text-sm font-medium hover:underline underline-offset-4">
              Virtual Office
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-6">Short-Term Stays</h1>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="sticky top-24 bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm">
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Space Type</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="event" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="event" className="ml-2 text-sm">
                          Event Space
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="meeting" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="meeting" className="ml-2 text-sm">
                          Meeting Room
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="party" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="party" className="ml-2 text-sm">
                          Party Venue
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-1 block">Date</label>
                    <Input type="date" />
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-1 block">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Min" />
                      <Input type="number" placeholder="Max" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-1 block">Capacity</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Min" />
                      <Input type="number" placeholder="Max" />
                    </div>
                  </div>

                  <Separator />

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>

            <div className="md:w-3/4">
              <div className="bg-white p-4 rounded-lg border mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="text" placeholder="Search by location or space type" className="pl-10" />
                  </div>
                  <div className="relative w-full md:w-auto">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="text" placeholder="Select date" className="pl-10" />
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={property.imageUrl || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 left-2">{typeLabel[property.type]}</Badge>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{property.rating}</span>
                          <span className="text-sm text-muted-foreground">({property.reviewCount})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{property.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Up to {property.capacity}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">${property.price}</span>
                        <span className="text-sm text-muted-foreground">/{property.priceUnit}</span>
                      </div>
                      <Button asChild>
                        <Link href={`/spaces/${property.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          <p className="text-sm text-muted-foreground">© 2025 Pillow & Space. All rights reserved.</p>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

