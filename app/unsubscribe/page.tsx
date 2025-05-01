import { Suspense } from 'react'
import UnsubscribeForm from '@/components/unsubscribe/UnsubscribeForm'

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <UnsubscribeForm />
      </Suspense>
    </div>
  )
} 