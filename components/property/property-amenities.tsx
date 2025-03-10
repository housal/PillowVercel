import type React from "react"
import {
  WifiIcon,
  CarIcon,
  UtensilsIcon,
  ComputerIcon as DesktopIcon,
  TvIcon,
  AirVentIcon,
  FlameIcon,
  ProjectorIcon,
  SquarePenIcon,
  SpeakerIcon,
  UtensilsCrossedIcon,
  FerrisWheelIcon as WheelchairIcon,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const amenityIcons: Record<string, React.ElementType> = {
    wifi: WifiIcon,
    parking: CarIcon,
    kitchen: UtensilsIcon,
    workspace: DesktopIcon,
    tv: TvIcon,
    aircon: AirVentIcon,
    heating: FlameIcon,
    projector: ProjectorIcon,
    whiteboard: SquarePenIcon,
    soundSystem: SpeakerIcon,
    catering: UtensilsCrossedIcon,
    wheelchair: WheelchairIcon,
  }

  const amenityLabels: Record<string, string> = {
    wifi: "WiFi",
    parking: "Parking",
    kitchen: "Kitchen",
    workspace: "Workspace",
    tv: "TV",
    aircon: "Air Conditioning",
    heating: "Heating",
    projector: "Projector",
    whiteboard: "Whiteboard",
    soundSystem: "Sound System",
    catering: "Catering Available",
    wheelchair: "Wheelchair Accessible",
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Amenities</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || null
          return (
            <div key={amenity} className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
              <span>{amenityLabels[amenity] || amenity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

