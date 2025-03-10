"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface SearchFiltersProps {
  initialFilters: {
    q?: string
    type?: string
    location?: string
    minPrice?: string
    maxPrice?: string
    capacity?: string
  }
}

export function SearchFilters({ initialFilters }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    q: initialFilters.q || "",
    type: initialFilters.type || "",
    location: initialFilters.location || "",
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
    capacity: initialFilters.capacity || "",
  })

  const [priceRange, setPriceRange] = useState([
    Number.parseInt(initialFilters.minPrice || "0"),
    Number.parseInt(initialFilters.maxPrice || "1000"),
  ])

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value)
        } else {
          newParams.delete(key)
        }
      })

      return newParams.toString()
    },
    [searchParams],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const queryString = createQueryString({
      ...filters,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    })

    router.push(`/search?${queryString}`)
  }

  const handleReset = () => {
    setFilters({
      q: "",
      type: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      capacity: "",
    })
    setPriceRange([0, 1000])

    router.push("/search")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="q">Search</Label>
          <Input
            id="q"
            placeholder="Search properties..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Property Type</Label>
          <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
            <SelectTrigger id="type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="event">Event Space</SelectItem>
              <SelectItem value="meeting">Meeting Room</SelectItem>
              <SelectItem value="party">Party Venue</SelectItem>
              <SelectItem value="office">Virtual Office</SelectItem>
              <SelectItem value="commercial">Commercial Space</SelectItem>
              <SelectItem value="residential">Residential Property</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Any location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 1000]}
            value={priceRange}
            min={0}
            max={1000}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Min Capacity</Label>
          <Input
            id="capacity"
            type="number"
            placeholder="Any capacity"
            value={filters.capacity}
            onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit">Apply Filters</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </form>
  )
}

