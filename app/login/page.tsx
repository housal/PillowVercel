import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

