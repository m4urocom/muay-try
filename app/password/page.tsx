import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 relative">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-white">Reset your password</h1>
                <p className="text-gray-400 text-sm text-balance">
                  Enter your email below to receive a password reset link
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://npwekmkmdvrwcnuyueam.supabase.co/storage/v1/object/sign/backgrounds/login.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NmZjNiYjBkLTNhMmQtNDBjOS04ZWI2LWI5ZTk1NzcxYTJjNiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kcy9sb2dpbi5wbmciLCJpYXQiOjE3NDYxOTk5MjEsImV4cCI6MTc3NzczNTkyMX0._SttRnc-WJS8PtGCJ_zCGQmQkZZ-ZuaCNi0Y1obpKdY"
          alt="Reset Password"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
} 