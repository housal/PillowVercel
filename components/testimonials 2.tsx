import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Planner",
      company: "Creative Events Co.",
      content:
        "SpaceBook made finding the perfect venue for our client's product launch incredibly easy. The booking process was seamless, and the space exceeded our expectations.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "TechStart Inc.",
      content:
        "We've been using SpaceBook for all our meeting room needs. The quality of spaces and the reliability of the platform has made our team collaboration much more effective.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Jessica Williams",
      role: "Office Manager",
      company: "Global Consulting",
      content:
        "The virtual office options on SpaceBook have transformed how our remote team operates. Professional addresses and meeting spaces when we need them - perfect solution!",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Trusted by thousands of businesses and event planners worldwide.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

