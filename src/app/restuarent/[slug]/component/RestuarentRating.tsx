import Stars from "@/app/components/Stars";
import { calculateReviewAvarage } from "@/utils/calculateReviewAvarage";
import { Review } from "@prisma/client";
import React from "react";

const RestuarentRating = ({reviews}:{reviews:Review[]}) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews}/>
        <p className="text-reg ml-3">{calculateReviewAvarage(reviews).toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Review{reviews.length > 1 ? "s": ""}
        </p>
      </div>
    </div>
  );
};

export default RestuarentRating;
