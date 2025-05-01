'use client'

import { Input } from "@/components/ui/input"
import { Bot } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "@/lib/hooks/use-debounce"

interface GymSearchProps {
  onSearch: (query: string) => void
}

export function GymSearch({ onSearch }: GymSearchProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search gyms using AI... (e.g., 'Muay Thai gyms with a pool near Bangkok')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10"
      />
      <Bot className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
        <Bot size={12} />
        Powered by OpenAI GPT-4 Mini
      </div>
    </div>
  )
} 