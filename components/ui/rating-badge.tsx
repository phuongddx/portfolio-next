import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number | string;
  className?: string;
}

export function RatingBadge({
  rating,
  className = "",
}: RatingBadgeProps) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-green-500 text-white",
        "flex items-center justify-center font-bold text-sm",
        className
      )}
    >
      {rating}
    </div>
  );
}
