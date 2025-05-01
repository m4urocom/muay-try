'use client'

import { useState } from 'react'
import TrainingFilters from '@/components/TrainingFilters'
import TrainingCardGrid from '../components/TrainingCardGrid'
import AISearchInput from '../components/AISearchInput'
import { searchTrainings } from '../actions/searchTrainings'

export default function TrainingPageContent() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    setIsSearching(true)
    setError(null)
    
    try {
      const result = await searchTrainings(query)
      if (result.error) {
        setError(result.error)
      } else {
        // Only update filters that were explicitly mentioned in the search
        if (result.filters) {
          if (result.filters.type) {
            setSelectedType(result.filters.type)
          } else {
            setSelectedType('') // Clear type filter if not mentioned
          }
          if (result.filters.level) {
            setSelectedLevel(result.filters.level)
          } else {
            setSelectedLevel('') // Clear level filter if not mentioned
          }
          if (result.filters.duration) {
            setSelectedDuration(result.filters.duration)
          } else {
            setSelectedDuration('') // Clear duration if not mentioned
          }
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search trainings');
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <main className="container max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-4 gap-6 py-6">
        {/* Left Sidebar */}
        <aside className="space-y-4">
          <div className="mb-6">
            <AISearchInput 
              onSearch={handleSearch} 
              isLoading={isSearching}
              type="trainings"
            />
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
          </div>
          <TrainingFilters
            selectedType={selectedType}
            selectedLevel={selectedLevel}
            selectedDuration={selectedDuration}
            onTypeChange={setSelectedType}
            onLevelChange={setSelectedLevel}
            onDurationChange={setSelectedDuration}
          />
        </aside>

        {/* Main Content */}
        <section className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TrainingCardGrid
              type={selectedType}
              level={selectedLevel}
              duration={selectedDuration}
            />
          </div>
        </section>
      </div>
    </main>
  )
} 