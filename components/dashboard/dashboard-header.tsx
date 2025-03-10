import Link from "next/link"
import { Logo } from "@/components/logo"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"

interface DashboardHeaderProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="hidden md:block">
            <Logo />
          </Link>
          <MobileNav />
        </div>
        <UserNav user={user} />
      </div>
    </header>
  )
}

