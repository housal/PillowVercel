import { requireAuth } from "@/lib/auth"
import { PropertyForm } from "@/components/property/property-form"

export default async function NewPropertyPage() {
  // Ensure user is authenticated
  await requireAuth()

  return (
    <main className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold">List Your Property</h1>
        <PropertyForm />
      </div>
    </main>
  )
}

