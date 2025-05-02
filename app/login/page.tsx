import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
} 