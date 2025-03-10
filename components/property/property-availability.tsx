interface PropertyAvailabilityProps {
  availability: {
    id: string
    dayOfWeek: number
    startTime: string
    endTime: string
  }[]
}

export function PropertyAvailability({ availability }: PropertyAvailabilityProps) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // Sort by day of week
  const sortedAvailability = [...availability].sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  // Format time (convert 24h to 12h)
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Availability</h2>
      <div className="mt-4 space-y-2">
        {sortedAvailability.map((avail) => (
          <div key={avail.id} className="flex items-center justify-between">
            <span className="font-medium">{dayNames[avail.dayOfWeek]}</span>
            <span className="text-muted-foreground">
              {formatTime(avail.startTime)} - {formatTime(avail.endTime)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

