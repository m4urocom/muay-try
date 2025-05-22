'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [googleHover, setGoogleHover] = useState(false)
  const [appleHover, setAppleHover] = useState(false)
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Login to your account</h1>
        <p className="text-gray-400 text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="flex items-center gap-2 text-center text-sm w-full">
          <div className="flex-1 h-px bg-gray-400" />
          <span className="text-gray-400 px-2 whitespace-nowrap">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-gray-400" />
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onMouseEnter={() => setGoogleHover(true)}
          onMouseLeave={() => setGoogleHover(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path
              d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.242 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.016 9.547-9.648 0-.648-.07-1.141-.156-1.602z"
              fill={googleHover ? "black" : "white"}
            />
            <path
              d="M3.545 7.545l3.273 2.402c.891-1.711 2.523-2.789 4.187-2.789 1.148 0 2.188.453 2.984 1.188l2.672-2.602c-1.523-1.406-3.477-2.244-5.656-2.244-3.453 0-6.375 2.344-7.422 5.547z"
              fill={googleHover ? "black" : "white"}
            />
            <path
              d="M12 22c2.438 0 4.484-.805 5.977-2.188l-2.797-2.289c-.82.57-1.867.914-3.18.914-2.453 0-4.523-1.656-5.266-3.883l-3.242 2.5c1.453 2.867 4.523 4.946 8.508 4.946z"
              fill={googleHover ? "black" : "white"}
            />
            <path
              d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.242 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.016 9.547-9.648 0-.648-.07-1.141-.156-1.602z"
              fill={googleHover ? "black" : "white"}
            />
          </svg>
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onMouseEnter={() => setAppleHover(true)}
          onMouseLeave={() => setAppleHover(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.06 0-.12 0-.18-.01-.01-.06-.01-.13-.01-.19 0-1.13.93-2.06 2.07-2.06.06 0 .12 0 .18.01.01.06.01.13.01.18zm2.52 4.36c-1.39-.02-2.57.8-3.24.8-.68 0-1.72-.78-2.84-.76-1.46.02-2.8.85-3.55 2.16-1.52 2.63-.39 6.52 1.09 8.66.72 1.04 1.58 2.2 2.71 2.16 1.09-.04 1.5-.7 2.81-.7 1.3 0 1.67.7 2.81.68 1.16-.02 1.89-1.06 2.6-2.11.82-1.19 1.16-2.34 1.18-2.4-.03-.01-2.25-.86-2.28-3.41-.02-2.13 1.74-3.14 1.82-3.19-1.01-1.48-2.59-1.65-3.14-1.67zm-2.13-3.13c.01 0 .01 0 0 0z"
              fill={appleHover ? "black" : "white"}
            />
          </svg>
          Login with Apple
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
