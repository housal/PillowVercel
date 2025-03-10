import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PropertyReviewsProps {
  reviews: {
    id: string
    rating: number
    content: string | null
    createdAt: Date
    user: {
      id: string
      name: string | null
      image: string | null
    }
  }[]
  averageRating: number
}

export function PropertyReviews({ reviews, averageRating }: PropertyReviewsProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>
        <div className="flex items-center">
          <StarIcon className="mr-1 h-5 w-5 fill-current text-yellow-500" />
          <span className="font-medium">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.user.image || ""} alt={review.user.name || "User"} />
                <AvatarFallback>
                  {review.user.name
                    ? review.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>

            {review.content && <p className="text-sm">{review.content}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

