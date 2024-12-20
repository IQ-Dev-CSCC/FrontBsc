import * as React from "react"

import { cn } from "@/lib/utils"

interface propsType extends React.HTMLAttributes<HTMLAnchorElement> {
  auberge_id: number;
  type: "auberge" | "camp";
  name: string;
  capacity: number;
  reserved: number;
}

export const AubergeCard = React.forwardRef<
  HTMLAnchorElement,
  propsType
>(({ auberge_id, type, name, capacity, reserved, className, ...props }, ref) => (
  <a
    href={`/auberges/${auberge_id}`}
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow min-h-32 font-bold cursor-pointer hover:scale-105 duration-100",
      className
    )}
    {...props}
  >
    <p className="font-bold text-lg m-4">{type == "camp" ? "Camp" : "Auberge"} {name}</p>
    <p className="font-extrabold text-4xl m-4 mt-auto">{reserved}/{capacity}</p>
  </a>
))

AubergeCard.displayName = "AubergeCard"
