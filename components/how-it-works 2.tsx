import { Building, Calendar, CreditCard, Search } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Search",
      description: "Find the perfect space by location, capacity, and amenities.",
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Book",
      description: "Select your dates and times, then instantly reserve your space.",
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Pay",
      description: "Secure payment through our platform with no hidden fees.",
    },
    {
      icon: <Building className="h-10 w-10" />,
      title: "Enjoy",
      description: "Show up and enjoy your perfectly suited commercial space.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Booking your ideal commercial space is simple and straightforward.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

