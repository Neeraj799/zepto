import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating, handleRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <Button
          className={`p-2 rounded-full transition-colors${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-primary hover:text-primary-foreground"
          }`}
          variant="outline"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-10 h-10 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default StarRating;
