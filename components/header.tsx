import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Search } from "@/components/search"
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <Button variant="ghost" size="icon" className="mr-2" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <UserNav />
        </div>
      </div>
    </div>
  )
}

