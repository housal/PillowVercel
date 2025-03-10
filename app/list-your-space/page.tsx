import Link from "next/link"
import { Building, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ListYourSpacePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">List Your Commercial Space</h1>
            <p className="mt-2 text-muted-foreground">
              Join thousands of property owners earning extra income by listing their spaces.
            </p>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Space Details</CardTitle>
                  <CardDescription>Provide information about your commercial space.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="space-type">Space Type</Label>
                    <Select>
                      <SelectTrigger id="space-type">
                        <SelectValue placeholder="Select space type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Event Space</SelectItem>
                        <SelectItem value="meeting">Meeting Room</SelectItem>
                        <SelectItem value="party">Party Venue</SelectItem>
                        <SelectItem value="office">Virtual/Serviced Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g., Modern Downtown Conference Center" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your space in detail..." className="min-h-32" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Street address" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="ZIP code" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="Country" defaultValue="United States" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Maximum Capacity</Label>
                    <Input id="capacity" type="number" placeholder="e.g., 100" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "WiFi",
                        "Projector",
                        "Sound System",
                        "Catering",
                        "Parking",
                        "Wheelchair Access",
                        "Kitchen",
                        "Restrooms",
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`amenity-${amenity}`}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor={`amenity-${amenity}`} className="font-normal">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Continue to Photos</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="photos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Photos</CardTitle>
                  <CardDescription>Upload high-quality photos of your space.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Upload Photos</Label>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="relative aspect-square cursor-pointer rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:border-muted-foreground/50"
                        >
                          <div className="flex flex-col items-center justify-center space-y-2 text-xs text-muted-foreground">
                            <Building className="h-8 w-8" />
                            <span>Upload image</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload at least 5 photos. First photo will be used as the cover image.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button>Continue to Pricing</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="pricing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>Set your pricing and booking terms.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="base-price">Base Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                        <Input id="base-price" type="number" className="pl-7" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price-unit">Price Per</Label>
                      <Select>
                        <SelectTrigger id="price-unit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hour">Hour</SelectItem>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cleaning-fee">Cleaning Fee</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input id="cleaning-fee" type="number" className="pl-7" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="min-booking">Minimum Booking Duration</Label>
                    <div className="flex gap-4">
                      <Input id="min-booking" type="number" placeholder="e.g., 2" />
                      <Select defaultValue="hours">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cancellation">Cancellation Policy</Label>
                    <Select>
                      <SelectTrigger id="cancellation">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible (24 hours)</SelectItem>
                        <SelectItem value="moderate">Moderate (5 days)</SelectItem>
                        <SelectItem value="strict">Strict (7 days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button>Continue to Availability</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Set when your space is available for booking.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Available Days</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`day-${day}`}
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                          <Label htmlFor={`day-${day}`} className="font-normal">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="opening-time">Opening Time</Label>
                      <Select defaultValue="09:00">
                        <SelectTrigger id="opening-time">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i.toString().padStart(2, "0")
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="closing-time">Closing Time</Label>
                      <Select defaultValue="17:00">
                        <SelectTrigger id="closing-time">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i.toString().padStart(2, "0")
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="advance-notice">Advance Notice Required</Label>
                    <Select defaultValue="24">
                      <SelectTrigger id="advance-notice">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                        <SelectItem value="72">3 days</SelectItem>
                        <SelectItem value="168">1 week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="preparation-time">Preparation Time Between Bookings</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="preparation-time">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button>Submit Listing</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

