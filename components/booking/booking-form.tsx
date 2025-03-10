"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addHours, differenceInHours, differenceInDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { DatePicker } from "@/components/date-picker"
import { Separator } from "@/components/ui/separator"

const bookingSchema = z.object({
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  guestCount: z.coerce.number().int().positive({ message: "Guest count must be a positive number" }).optional(),
  notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

interface BookingFormProps {
  propertyId: string
  propertyType: string
  pricePerUnit: number
  priceUnit: string
  cleaningFee?: number
  serviceFee?: number
  capacity?: number
}

export function BookingForm({
  propertyId,
  propertyType,
  pricePerUnit,
  priceUnit,
  cleaningFee = 0,
  serviceFee = 0,
  capacity,
}: BookingFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: addHours(new Date(), 2),
      startTime: "09:00",
      endTime: "11:00",
      guestCount: 1,
      notes: "",
    },
  })

  // Calculate total price when dates change
  const calculateTotalPrice = (values: Partial<BookingFormValues>) => {
    if (!values.startDate || !values.endDate) return 0

    let durationValue = 0
    let durationUnit = ""

    if (priceUnit === "hour") {
      // For hourly rentals, use the time fields
      if (values.startTime && values.endTime) {
        const [startHour, startMinute] = values.startTime.split(":").map(Number)
        const [endHour, endMinute] = values.endTime.split(":").map(Number)

        const startDate = new Date(values.startDate)
        startDate.setHours(startHour, startMinute)

        const endDate = new Date(values.startDate)
        endDate.setHours(endHour, endMinute)

        durationValue = Math.max(1, differenceInHours(endDate, startDate))
        durationUnit = "hours"
      }
    } else if (priceUnit === "day") {
      durationValue = Math.max(1, differenceInDays(values.endDate, values.startDate))
      durationUnit = "days"
    } else if (priceUnit === "month") {
      // Approximate months as 30 days
      durationValue = Math.max(1, Math.ceil(differenceInDays(values.endDate, values.startDate) / 30))
      durationUnit = "months"
    }

    setDuration(durationValue)

    const basePrice = pricePerUnit * durationValue
    const total = basePrice + cleaningFee + serviceFee

    setTotalPrice(total)
    return total
  }

  // Recalculate when form values change
  form.watch((values) => {
    calculateTotalPrice(values)
  })

  async function onSubmit(data: BookingFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      // Combine date and time for hourly bookings
      let startDateTime = data.startDate
      let endDateTime = data.endDate

      if (priceUnit === "hour" && data.startTime && data.endTime) {
        const [startHour, startMinute] = data.startTime.split(":").map(Number)
        const [endHour, endMinute] = data.endTime.split(":").map(Number)

        startDateTime = new Date(data.startDate)
        startDateTime.setHours(startHour, startMinute)

        endDateTime = new Date(data.startDate)
        endDateTime.setHours(endHour, endMinute)
      }

      const bookingData = {
        propertyId,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        totalPrice,
        guestCount: data.guestCount,
        notes: data.notes,
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong")
      }

      // Redirect to booking confirmation
      router.push(`/bookings/${result.id}/confirmation`)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {priceUnit === "hour" ? (
            <>
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-in</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-out</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {capacity && (
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={capacity}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special requests</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any special requirements or requests?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Price details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  ${pricePerUnit} × {duration} {duration === 1 ? priceUnit : `${priceUnit}s`}
                </span>
                <span>${pricePerUnit * duration}</span>
              </div>
              {cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>${cleaningFee}</span>
                </div>
              )}
              {serviceFee > 0 && (
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Reserve"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">You won't be charged yet</p>
        </form>
      </Form>
    </div>
  )
}

