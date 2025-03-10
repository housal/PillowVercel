"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HomeIcon, BuildingIcon, CalendarIcon, MessageSquareIcon, UserIcon, SettingsIcon, MenuIcon } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="px-1">
          <SheetTitle asChild>
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 py-6">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={cn("justify-start", route.active && "bg-muted font-medium")}
              asChild
            >
              <Link href={route.href} onClick={() => setOpen(false)}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

