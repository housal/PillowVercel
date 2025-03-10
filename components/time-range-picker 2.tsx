"use client"

import * as React from "react"
import { format } from "date-fns"
import { Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeRangePickerProps {
  startTime: string
  endTime: string
  onStartTimeChange: (time: string) => void
  onEndTimeChange: (time: string) => void
  step?: number
}

export function TimeRangePicker({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  step = 30,
}: TimeRangePickerProps) {
  // Generate time options in 30-minute increments
  const timeOptions = React.useMemo(() => {
    const options = []
    const totalMinutesInDay = 24 * 60

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += step) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      const formattedHours = hours.toString().padStart(2, "0")
      const formattedMins = mins.toString().padStart(2, "0")
      const time = `${formattedHours}:${formattedMins}`
      options.push(time)
    }

    return options
  }, [step])

  // Format time for display
  const formatTimeForDisplay = (time: string) => {
    try {
      const [hours, minutes] = time.split(":").map(Number)
      const date = new Date()
      date.setHours(hours, minutes)
      return format(date, "h:mm a")
    } catch (error) {
      return time
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={startTime} onValueChange={onStartTimeChange}>
        <SelectTrigger className="w-full">
          <Clock className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Start time">{formatTimeForDisplay(startTime)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => (
            <SelectItem key={`start-${time}`} value={time}>
              {formatTimeForDisplay(time)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-muted-foreground">to</span>

      <Select value={endTime} onValueChange={onEndTimeChange}>
        <SelectTrigger className="w-full">
          <Clock className="mr-2 h-4 w-4" />
          <SelectValue placeholder="End time">{formatTimeForDisplay(endTime)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => (
            <SelectItem key={`end-${time}`} value={time}>
              {formatTimeForDisplay(time)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

