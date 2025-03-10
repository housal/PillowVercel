import Link from "next/link"
import { ArrowRight, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export default function HowItWorksPage() {
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

          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">How Pillow & Space Works</h1>
            <p className="text-muted-foreground text-center mb-12">
              We make finding and booking commercial spaces simple and hassle-free. Choose the option that fits your
              needs.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-6">Long-Term Leases</h2>
                <Card className="bg-[#f8f9fa] border-none">
                  <CardContent className="pt-6">
                    <ol className="space-y-6">
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Search & Find</h3>
                          <p className="text-muted-foreground">
                            Browse our list of residential and commercial properties. Filter by location, size, price,
                            and amenities.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Submit a Profile</h3>
                          <p className="text-muted-foreground">
                            Create a profile with your desired lease duration, rental price range, and occupant details.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Application Review</h3>
                          <p className="text-muted-foreground">
                            Property owner/landlord reviews your application and responds to your request.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          4
                        </div>
                        <div>
                          <h3 className="font-medium">Sign & Pay</h3>
                          <p className="text-muted-foreground">
                            Sign the lease agreement online and pay the security deposit and first month's rent.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/long-term" className="flex items-center justify-between">
                        <span>Browse Long-Term Properties</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6">Short-Term Stays</h2>
                <Card className="bg-[#f0f7fa] border-none">
                  <CardContent className="pt-6">
                    <ol className="space-y-6">
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Search & Book</h3>
                          <p className="text-muted-foreground">
                            Find properties available for your selected dates and location. Filter by space type,
                            capacity, and amenities.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Instant Booking</h3>
                          <p className="text-muted-foreground">
                            Book instantly or send a request if needed. Receive immediate confirmation for your
                            reservation.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Check-in & Enjoy</h3>
                          <p className="text-muted-foreground">
                            Check in to your stay or event space with our hassle-free process. Enjoy your perfectly
                            suited commercial space.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/short-term" className="flex items-center justify-between">
                        <span>Find Short-Term Spaces</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6">Virtual Office</h2>
                <Card className="bg-[#e6f3f8] border-none">
                  <CardContent className="pt-6">
                    <ol className="space-y-6">
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Find Locations</h3>
                          <p className="text-muted-foreground">
                            Find virtual office locations worldwide. Browse our global network of prestigious business
                            addresses.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Choose a Plan</h3>
                          <p className="text-muted-foreground">
                            Select the plan (monthly/annual) that fits your needs. Compare features like mail handling,
                            phone answering, and meeting room access.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Complete Payment</h3>
                          <p className="text-muted-foreground">
                            Pay for your virtual office subscription and start using your new business address and
                            services immediately.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/virtual-office" className="flex items-center justify-between">
                        <span>Explore Virtual Office Solutions</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </section>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of satisfied customers who have found their perfect space with Pillow & Space.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">Create an Account</Link>
              </Button>
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

