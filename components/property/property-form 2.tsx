"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const propertySchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(5, { message: "Location is required" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  priceUnit: z.enum(["hour", "day", "month"]),
  type: z.enum(["event", "meeting", "party", "office", "commercial", "residential"]),
  capacity: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().positive().optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  availability: z
    .array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .optional(),
})

type PropertyFormValues = z.infer<typeof propertySchema>

interface PropertyFormProps {
  initialData?: Partial<PropertyFormValues>
  isEditing?: boolean
}

const amenitiesList = [
  { id: "wifi", label: "WiFi" },
  { id: "parking", label: "Parking" },
  { id: "kitchen", label: "Kitchen" },
  { id: "workspace", label: "Workspace" },
  { id: "tv", label: "TV" },
  { id: "aircon", label: "Air Conditioning" },
  { id: "heating", label: "Heating" },
  { id: "projector", label: "Projector" },
  { id: "whiteboard", label: "Whiteboard" },
  { id: "soundSystem", label: "Sound System" },
  { id: "catering", label: "Catering Available" },
  { id: "wheelchair", label: "Wheelchair Accessible" },
]

export function PropertyForm({ initialData, isEditing = false }: PropertyFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      location: initialData?.location || "",
      price: initialData?.price || 0,
      priceUnit: initialData?.priceUnit || "hour",
      type: initialData?.type || "event",
      capacity: initialData?.capacity || undefined,
      size: initialData?.size || undefined,
      bedrooms: initialData?.bedrooms || undefined,
      bathrooms: initialData?.bathrooms || undefined,
      amenities: initialData?.amenities || [],
      images: initialData?.images || [],
      availability: initialData?.availability || [
        { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" },
      ],
    },
  })

  async function onSubmit(data: PropertyFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const url = isEditing ? `/api/properties/${initialData?.id}` : "/api/properties"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong")
      }

      // Redirect to property page
      router.push(`/properties/${result.id}`)
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Modern Downtown Conference Center" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your space in detail..." className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 123 Business Ave, San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                            <Input
                              type="number"
                              className="pl-7"
                              {...field}
                              onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Per</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hour">Hour</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Space Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select space type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="event">Event Space</SelectItem>
                          <SelectItem value="meeting">Meeting Room</SelectItem>
                          <SelectItem value="party">Party Venue</SelectItem>
                          <SelectItem value="office">Virtual Office</SelectItem>
                          <SelectItem value="commercial">Commercial Space</SelectItem>
                          <SelectItem value="residential">Residential Property</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (people)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 100"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size (sq ft)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 1000"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 2"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 2"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Amenities</FormLabel>
                        <FormDescription>Select all amenities that your property offers</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {amenitiesList.map((amenity) => (
                          <FormField
                            key={amenity.id}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem key={amenity.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(amenity.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || []
                                        return checked
                                          ? field.onChange([...currentValues, amenity.id])
                                          : field.onChange(currentValues.filter((value) => value !== amenity.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{amenity.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Images</h3>

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URLs</FormLabel>
                      <FormDescription>Enter URLs for your property images (one per line)</FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                          value={(field.value || []).join("\n")}
                          onChange={(e) => {
                            const urls = e.target.value
                              .split("\n")
                              .map((url) => url.trim())
                              .filter(Boolean)
                            field.onChange(urls)
                          }}
                          className="min-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Availability</h3>

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Days and Hours</FormLabel>
                      <FormDescription>Set when your space is available for booking</FormDescription>
                      <div className="space-y-4">
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                          const dayNames = [
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ]
                          const availabilityForDay = field.value?.find((a) => a.dayOfWeek === day)

                          return (
                            <div key={day} className="flex items-center gap-4">
                              <Checkbox
                                checked={!!availabilityForDay}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || []
                                  if (checked) {
                                    // Add this day if it doesn't exist
                                    if (!availabilityForDay) {
                                      field.onChange([
                                        ...currentValues,
                                        { dayOfWeek: day, startTime: "09:00", endTime: "17:00" },
                                      ])
                                    }
                                  } else {
                                    // Remove this day
                                    field.onChange(currentValues.filter((a) => a.dayOfWeek !== day))
                                  }
                                }}
                              />
                              <span className="w-24">{dayNames[day]}</span>

                              {availabilityForDay && (
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="time"
                                    value={availabilityForDay.startTime}
                                    onChange={(e) => {
                                      const newValues = field.value?.map((a) => {
                                        if (a.dayOfWeek === day) {
                                          return { ...a, startTime: e.target.value }
                                        }
                                        return a
                                      })
                                      field.onChange(newValues)
                                    }}
                                    className="w-32"
                                  />
                                  <span>to</span>
                                  <Input
                                    type="time"
                                    value={availabilityForDay.endTime}
                                    onChange={(e) => {
                                      const newValues = field.value?.map((a) => {
                                        if (a.dayOfWeek === day) {
                                          return { ...a, endTime: e.target.value }
                                        }
                                        return a
                                      })
                                      field.onChange(newValues)
                                    }}
                                    className="w-32"
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Property" : "Create Property"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

