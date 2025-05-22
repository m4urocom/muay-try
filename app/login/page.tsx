import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 relative">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://npwekmkmdvrwcnuyueam.supabase.co/storage/v1/object/sign/backgrounds/login.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2NmZjNiYjBkLTNhMmQtNDBjOS04ZWI2LWI5ZTk1NzcxYTJjNiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kcy9sb2dpbi5wbmciLCJpYXQiOjE3NDYxOTk5MjEsImV4cCI6MTc3NzczNTkyMX0._SttRnc-WJS8PtGCJ_zCGQmQkZZ-ZuaCNi0Y1obpKdY"
          alt="Login"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
