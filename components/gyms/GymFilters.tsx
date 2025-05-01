'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const THAI_CITIES = [
  "Bangkok",
  "Chiang Mai",
  "Pattaya",
  "Phuket",
  "Ayutthaya",
  "Hua Hin",
  "Koh Samui",
  "Krabi",
].sort()

const AMENITIES = [
  { id: "group_classes", label: "Group Classes" },
  { id: "personal_trainer", label: "Personal Trainer" },
  { id: "weight_room", label: "Weight Room" },
  { id: "shower", label: "Shower" },
  { id: "free_wifi", label: "Free WiFi" },
  { id: "restrooms", label: "Restrooms" },
  { id: "onsite_accommodation", label: "Onsite Accommodation" },
  { id: "restaurant", label: "Restaurant" },
  { id: "shop", label: "Shop" },
  { id: "massage_and_spa", label: "Massage & Spa" },
  { id: "pool", label: "Pool" },
]

interface GymFiltersProps {
  selectedCities: string[]
  selectedAmenities: string[]
  onCityChange: (city: string) => void
  onAmenityChange: (amenity: string) => void
}

export function GymFilters({
  selectedCities,
  selectedAmenities,
  onCityChange,
  onAmenityChange,
}: GymFiltersProps) {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsLocationOpen(!isLocationOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>Location</CardTitle>
            {isLocationOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {isLocationOpen && (
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {THAI_CITIES.map((city) => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox
                      id={city}
                      checked={selectedCities.includes(city)}
                      onCheckedChange={() => onCityChange(city)}
                    />
                    <label
                      htmlFor={city}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {city}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>Amenities</CardTitle>
            {isAmenitiesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {isAmenitiesOpen && (
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {AMENITIES.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => onAmenityChange(amenity.id)}
                    />
                    <label
                      htmlFor={amenity.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  )
} 