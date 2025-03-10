import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Filter, Globe, MapPin, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"

export default function VirtualOfficePage() {
  // Mock data for virtual offices
  const offices = [
    {
      id: "1",
      title: "Premium Virtual Office in Financial District",
      location: "San Francisco, CA",
      price: 99,
      priceUnit: "month",
      features: ["Business Address", "Mail Handling", "Meeting Room Credits"],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "Executive Virtual Office Suite",
      location: "New York, NY",
      price: 149,
      priceUnit: "month",
      features: ["Business Address", "Mail Handling", "Meeting Room Credits", "Phone Answering"],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "3",
      title: "Basic Virtual Office Plan",
      location: "Chicago, IL",
      price: 49,
      priceUnit: "month",
      features: ["Business Address", "Mail Forwarding"],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "Global Virtual Office Network",
      location: "Multiple Locations",
      price: 199,
      priceUnit: "month",
      features: ["Global Address Network", "Mail Handling", "Meeting Rooms Worldwide", "24/7 Support"],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  ]

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

          <h1 className="text-3xl font-bold mb-6">Virtual Office Solutions</h1>

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
                    <label className="text-sm font-medium mb-1 block">Plan Features</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="business-address" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="business-address" className="ml-2 text-sm">
                          Business Address
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="mail-handling" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="mail-handling" className="ml-2 text-sm">
                          Mail Handling
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="meeting-rooms" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="meeting-rooms" className="ml-2 text-sm">
                          Meeting Room Access
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="phone" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="phone" className="ml-2 text-sm">
                          Phone Answering
                        </label>
                      </div>
                    </div>
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
                    <label className="text-sm font-medium mb-1 block">Billing Cycle</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="monthly" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="monthly" className="ml-2 text-sm">
                          Monthly
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="annual" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="annual" className="ml-2 text-sm">
                          Annual (Save 15%)
                        </label>
                      </div>
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
                    <Input type="text" placeholder="Search by location or plan type" className="pl-10" />
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
                {offices.map((office) => (
                  <Card key={office.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={office.imageUrl || "/placeholder.svg"}
                        alt={office.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 left-2">Virtual Office</Badge>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold line-clamp-1">{office.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {office.location === "Multiple Locations" ? (
                          <>
                            <Globe className="h-3.5 w-3.5" />
                            <span>{office.location}</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{office.location}</span>
                          </>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-wrap gap-2">
                        {office.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">${office.price}</span>
                        <span className="text-sm text-muted-foreground">/{office.priceUnit}</span>
                      </div>
                      <Button asChild>
                        <Link href={`/virtual-office/${office.id}`}>Select Plan</Link>
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

