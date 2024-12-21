"use client"

import { cn } from "@/lib/utils"
import { Building2, Users, Shield, Map, LayoutDashboard, Settings, CreditCard } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const routes = [
  {
    label: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-zinc-400",
  },
  {
    label: "Dépenses",
    icon: CreditCard,
    href: "/expenses",
    color: "text-zinc-400",
  },
  {
    label: "Résidents",
    icon: Users,
    href: "/residents",
    color: "text-zinc-400",
  },
  {
    label: "Auberges",
    icon: Building2,
    href: "/auberges",
    color: "text-zinc-400",
  },
  {
    label: "Liste noire",
    icon: Shield,
    href: "/blacks",
    color: "text-zinc-400",
  },
  {
    label: "Carte",
    icon: Map,
    href: "/map",
    color: "text-zinc-400",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
    color: "text-zinc-400",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-black flex flex-col h-full p-6 z-auto	" >
      {/* Profile section */}
      <div className="flex items-center gap-x-4 mb-8">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.jpg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-[10px] font-medium text-white">1</span>
          </div>
        </div>
        <div>
          <h3 className="text-white font-medium">Wilaya</h3>
          <p className="text-sm text-zinc-400">@boumerdasDirection</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-x-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
              pathname === route.href 
                ? "text-white bg-white/10" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

