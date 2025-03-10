import Image from "next/image"
import Link from "next/link"
import { Check, ChevronLeft, Clock, MapPin, Share, Star, Users, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"
import { TimeRangePicker } from "@/components/time-range-picker"

export default function SpaceDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data from an API based on the ID
  const space = {
    id: params.id,
    title: "Modern Downtown Conference Center",
    description:
      "A state-of-the-art conference center in the heart of downtown, perfect for corporate events, product launches, and large meetings. Features the latest AV equipment, flexible seating arrangements, and on-site catering options.",
    location: "123 Business Ave, San Francisco, CA",
    price: 150,
    priceUnit: "hour",
    type: "event",
    rating: 4.9,
    reviewCount: 128,
    capacity: 200,
    amenities: [
      "High-speed WiFi",
      "4K Projectors",
      "Sound System",
      "Catering Available",
      "Adjustable Lighting",
      "Flexible Seating",
      "Parking",
      "Wheelchair Accessible",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    host: {
      name: "Business Properties Inc.",
      responseRate: 98,
      responseTime: "within an hour",
      joinedDate: "January 2020",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    reviews: [
      {
        id: "1",
        author: "Jennifer L.",
        date: "March 2023",
        rating: 5,
        content:
          "Perfect venue for our company's annual meeting. The space was exactly as described, and the staff was incredibly helpful with setup.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "2",
        author: "Robert T.",
        date: "February 2023",
        rating: 5,
        content:
          "Excellent location and amenities. The AV equipment was top-notch, which was crucial for our presentation.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "3",
        author: "Michelle K.",
        date: "January 2023",
        rating: 4,
        content:
          "Great space overall. Only minor issue was parking availability, but the venue itself was perfect for our needs.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/spaces" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to search results
            </Link>
          </Button>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold md:text-3xl">{space.title}</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{space.rating}</span>
              <span className="text-muted-foreground">({space.reviewCount} reviews)</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{space.location}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg md:col-span-2">
                <Image src={space.images[0] || "/placeholder.svg"} alt={space.title} fill className="object-cover" />
              </div>
              {space.images.slice(1, 4).map((image, index) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${space.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-6">
                  <div className="grid gap-6">
                    <div>
                      <h2 className="text-xl font-semibold">About this space</h2>
                      <p className="mt-2 text-muted-foreground">{space.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Space details</h3>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>Up to {space.capacity} people</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>Minimum 2-hour booking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wifi className="h-5 w-5 text-muted-foreground" />
                          <span>High-speed WiFi</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Hosted by {space.host.name}</h3>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full">
                          <Image
                            src={space.host.avatar || "/placeholder.svg"}
                            alt={space.host.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Response rate: {space.host.responseRate}%</p>
                          <p className="text-sm text-muted-foreground">Response time: {space.host.responseTime}</p>
                          <p className="text-sm text-muted-foreground">Joined in {space.host.joinedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="mt-6">
                  <h2 className="text-xl font-semibold">Amenities</h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {space.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium">{space.rating}</span>
                      <span className="text-muted-foreground">({space.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-6">
                    {space.reviews.map((review) => (
                      <div key={review.id} className="grid gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="ml-auto flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.content}</p>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-6">
                  <h2 className="text-xl font-semibold">Location</h2>
                  <p className="mt-2 text-muted-foreground">{space.location}</p>
                  <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-muted">
                    {/* In a real app, you would integrate with a maps API here */}
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">Map view would be displayed here</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>
                  ${space.price} <span className="text-base font-normal text-muted-foreground">/{space.priceUnit}</span>
                </CardTitle>
                <CardDescription>Book this space for your next event</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Date</h3>
                  <DatePicker />
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">Time</h3>
                  <TimeRangePicker />
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">Number of guests</h3>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="1-10">1-10 guests</option>
                    <option value="11-25">11-25 guests</option>
                    <option value="26-50">26-50 guests</option>
                    <option value="51-100">51-100 guests</option>
                    <option value="101-200">101-200 guests</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="grid w-full gap-2">
                  <div className="flex items-center justify-between">
                    <span>$150 x 4 hours</span>
                    <span>$600</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cleaning fee</span>
                    <span>$100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service fee</span>
                    <span>$70</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>$770</span>
                  </div>
                </div>
                <Button size="lg" className="w-full">
                  Reserve
                </Button>
                <p className="text-center text-xs text-muted-foreground">You won't be charged yet</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

