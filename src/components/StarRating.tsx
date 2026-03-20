import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeMap = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };

const StarRating = ({ rating, size = "md", showValue = false }: StarRatingProps) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeMap[size]} ${
            i < Math.floor(rating) ? "text-star fill-current" : i < rating ? "text-star fill-current opacity-50" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
    {showValue && <span className="text-sm font-medium">{rating.toFixed(1)}</span>}
  </div>
);

export default StarRating;
