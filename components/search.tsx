"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react'

export function Search() {
  return (
    <div className="hidden md:flex items-center relative">
      <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 md:w-[300px] lg:w-[400px]"
      />
    </div>
  )
}

