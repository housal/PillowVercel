import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquareIcon } from "lucide-react"

interface PropertyHostProps {
  host: {
    id: string
    name: string | null
    image: string | null
  }
}

export function PropertyHost({ host }: PropertyHostProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Hosted by {host.name}</h2>
      <div className="mt-4 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={host.image || ""} alt={host.name || "Host"} />
          <AvatarFallback>
            {host.name
              ? host.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "H"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{host.name}</h3>
          <p className="text-sm text-muted-foreground">Host since 2023</p>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <Link href={`/messages/${host.id}`}>
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Contact Host
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

