import { Metadata } from 'next'
import TrainingPageContent from './TrainingPageContent'

export const metadata: Metadata = {
  title: 'Training | Muay Try',
  description: 'Find the perfect Muay Thai training program for you',
}

export default function TrainingPage() {
  return <TrainingPageContent />
} 