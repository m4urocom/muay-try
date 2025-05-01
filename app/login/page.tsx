import { AuthForm } from '@/components/auth/AuthForm'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  )
} 