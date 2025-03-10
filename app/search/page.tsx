import { Suspense } from "react"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchSkeleton } from "@/components/search/search-skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
    type?: string
    location?: string
    minPrice?: string
    maxPrice?: string
    capacity?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <main className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Find Your Perfect Space</h1>

      <div className="grid gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <aside>
          <SearchFilters initialFilters={searchParams} />
        </aside>

        <div>
          <Suspense fallback={<SearchSkeleton />}>
            <SearchResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

