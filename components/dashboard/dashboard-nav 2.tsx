"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HomeIcon, BuildingIcon, CalendarIcon, MessageSquareIcon, UserIcon, SettingsIcon } from "lucide-react"

interface DashboardNavProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
  }
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: HomeIcon,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/properties",
      label: "Properties",
      icon: BuildingIcon,
      active: pathname === "/dashboard/properties",
    },
    {
      href: "/dashboard/bookings",
      label: "Bookings",
      icon: CalendarIcon,
      active: pathname === "/dashboard/bookings",
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      icon: MessageSquareIcon,
      active: pathname === "/dashboard/messages",
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: UserIcon,
      active: pathname === "/dashboard/profile",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: SettingsIcon,
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <nav className="hidden w-[220px] flex-col md:flex lg:w-[240px]">
      <div className="flex flex-col gap-2 py-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={route.active ? "secondary" : "ghost"}
            className={cn("justify-start", route.active && "bg-muted font-medium")}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}

