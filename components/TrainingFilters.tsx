'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type FilterOption = {
  id: string
  label: string
}

const typeOptions: FilterOption[] = [
  { id: 'group-class-session', label: 'Group Class Session' },
  { id: 'group-class-period', label: 'Group Class Period' },
  { id: 'private-class', label: 'Private Class' },
  { id: 'package', label: 'Package' },
]

const levelOptions: FilterOption[] = [
  { id: 'all-levels', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'fighter', label: 'Fighter' },
  { id: 'kids', label: 'Kids' },
]

const durationOptions: FilterOption[] = [
  { id: '1-day', label: '1 Day' },
  { id: '1-week', label: '1 Week' },
  { id: '2-weeks', label: '2 Weeks' },
  { id: '3-weeks', label: '3 Weeks' },
  { id: '1-month', label: '1 Month' },
  { id: '2-months', label: '2 Months' },
  { id: '3-months', label: '3 Months' },
  { id: '6-months', label: '6 Months' },
  { id: '1-year', label: '1 Year' },
]

interface TrainingFiltersProps {
  selectedType: string
  selectedLevel: string
  selectedDuration: string
  onTypeChange: (type: string) => void
  onLevelChange: (level: string) => void
  onDurationChange: (duration: string) => void
}

export default function TrainingFilters({
  selectedType,
  selectedLevel,
  selectedDuration,
  onTypeChange,
  onLevelChange,
  onDurationChange,
}: TrainingFiltersProps) {
  const [isTypeOpen, setIsTypeOpen] = useState(true)
  const [isLevelOpen, setIsLevelOpen] = useState(true)
  const [isDurationOpen, setIsDurationOpen] = useState(true)

  return (
    <div className="space-y-4">
      {/* Type Filter */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsTypeOpen(!isTypeOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>Type</CardTitle>
            {isTypeOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {isTypeOpen && (
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <RadioGroup value={selectedType} onValueChange={onTypeChange}>
                {typeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value={option.id} id={`type-${option.id}`} />
                    <Label htmlFor={`type-${option.id}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          </CardContent>
        )}
      </Card>

      {/* Level Filter */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsLevelOpen(!isLevelOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>Level</CardTitle>
            {isLevelOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {isLevelOpen && (
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <RadioGroup value={selectedLevel} onValueChange={onLevelChange}>
                {levelOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value={option.id} id={`level-${option.id}`} />
                    <Label htmlFor={`level-${option.id}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          </CardContent>
        )}
      </Card>

      {/* Duration Filter */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsDurationOpen(!isDurationOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>Duration</CardTitle>
            {isDurationOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {isDurationOpen && (
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <RadioGroup value={selectedDuration} onValueChange={onDurationChange}>
                {durationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value={option.id} id={`duration-${option.id}`} />
                    <Label htmlFor={`duration-${option.id}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  )
} 