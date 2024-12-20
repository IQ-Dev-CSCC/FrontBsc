import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activity = [
  {
    name: "Jean Dubois",
    time: "il y a 2 minutes",
    action: "a été enregistré",
    type: "Gratuit",
  },
  {
    name: "Sophie Martin",
    time: "il y a 4 minutes",
    action: "a quitté l'auberge",
    type: "Non Gratuit",
  },
  {
    name: "Michel Bernard",
    time: "il y a 6 minutes",
    action: "a été ajouté à la liste noire",
    type: "Alert",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activity.map((item, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {item.action} - {item.time}
            </p>
          </div>
          <div className={`ml-auto font-medium ${
            item.type === "Gratuit" 
              ? "text-green-500"
              : item.type === "Non Gratuit"
              ? "text-blue-500"
              : "text-red-500"
          }`}>
            {item.type}
          </div>
        </div>
      ))}
    </div>
  )
}

