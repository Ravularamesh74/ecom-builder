import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  precision?: number; // e.g., 0.1, 0.5
}

const sizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
};

const StarRating = ({
  rating,
  size = "md",
  showValue = false,
  precision = 0.1,
}: StarRatingProps) => {
  const roundedRating =
    Math.round(rating / precision) * precision;

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rating: ${roundedRating} out of 5`}
    >
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.min(Math.max(roundedRating - i, 0), 1);

          return (
            <div key={i} className="relative">
              {/* Empty star */}
              <Star
                size={sizeMap[size]}
                className="text-muted-foreground"
              />

              {/* Filled portion */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={sizeMap[size]}
                  className="text-yellow-500 fill-yellow-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium ml-1">
          {roundedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;