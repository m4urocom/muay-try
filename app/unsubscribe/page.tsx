'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const email = searchParams.get('email')
        const hash = searchParams.get('hash')

        if (!email || !hash) {
          setStatus('error')
          setMessage('Invalid unsubscribe link')
          return
        }

        const response = await fetch(
          `/api/unsubscribe?email=${encodeURIComponent(email)}&hash=${hash}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to unsubscribe')
        }

        setStatus('success')
        setMessage('You have been successfully unsubscribed from our mailing list.')
      } catch (error) {
        console.error('Failed to unsubscribe:', error);
        setStatus('error')
        setMessage('Failed to unsubscribe. Please try again later.')
      }
    }

    unsubscribe()
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Unsubscribe from MuayTry</h1>
        
        {status === 'loading' && (
          <div className="text-gray-600">Processing your request...</div>
        )}
        
        {status === 'success' && (
          <div className="text-green-600">
            <p>{message}</p>
            <p className="mt-4 text-sm text-gray-500">
              We&apos;re sorry to see you go. If you change your mind, you can always join our waitlist again.
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-red-600">
            <p>{message}</p>
            <p className="mt-4 text-sm text-gray-500">
              If you continue having issues, please contact us at support@muaytry.com
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 