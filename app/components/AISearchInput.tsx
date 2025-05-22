'use client';

import { useState, KeyboardEvent } from 'react';
import { Search, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AISearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  type?: 'gyms' | 'trainings';
}

export default function AISearchInput({ onSearch, isLoading = false, type = 'gyms' }: AISearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearch(searchQuery.trim());
      }
    }
  };

  const getPlaceholder = () => {
    if (type === 'trainings') {
      return "Try 'beginner group classes for 1 month' or 'advanced fighter training'";
    }
    return "Try 'gyms in Chiang Mai with a pool and massage services'";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-primary" />
          <span className="text-base font-medium">AI-Powered Search</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              className={cn(
                "w-full max-w-[95vw] sm:max-w-full px-4 py-3 pl-11 text-base rounded-md",
                "border border-input bg-background",
                "focus-visible:outline-none focus-visible:ring-1",
                "focus-visible:ring-ring focus-visible:border-input",
                "placeholder:text-muted-foreground",
                "min-h-[100px] resize-none",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              disabled={isLoading}
            />
            <Search className="w-4 h-4 absolute left-4 top-4 text-muted-foreground" />
            {isLoading && (
              <div className="absolute right-4 top-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className={cn(
              "mt-3 w-full py-2.5 px-4 rounded-md font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {isLoading ? 'Searching...' : `Search ${type === 'trainings' ? 'Training Programs' : 'Gyms'}`}
          </button>
        </form>
      </CardContent>
    </Card>
  );
} 