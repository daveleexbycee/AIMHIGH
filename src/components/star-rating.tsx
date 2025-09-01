
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({ 
  rating, 
  totalStars = 5, 
  interactive = false,
  onRatingChange,
  className 
}: StarRatingProps) {
  
  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
            <Star
                key={i}
                className={cn(
                    "w-5 h-5",
                    starValue <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground fill-muted-foreground/50",
                    interactive && "cursor-pointer transition-transform hover:scale-125"
                )}
                onClick={() => handleStarClick(i)}
            />
        );
      })}
    </div>
  );
}

    