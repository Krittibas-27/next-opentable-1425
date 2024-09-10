import React from "react";
import fullstar from "../../../public/icons/full-star.png";
import helfStar from "../../../public/icons/half-star.png";
import emptystar from "../../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewAvarage } from "@/utils/calculateReviewAvarage";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const reviewRating = rating || calculateReviewAvarage(reviews);
  const renderStar = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const floatingStar = parseFloat((reviewRating - i).toFixed(1));
      if (floatingStar >= 1) stars.push(fullstar);
      else if (floatingStar < 1 && floatingStar > 0) {
        if (floatingStar <= 0.2) stars.push(emptystar);
        else if (floatingStar > 0.2 && floatingStar <= 0.6)
          stars.push(helfStar);
      } else {
        stars.push(emptystar);
      }
    }
    return stars.map((star) => (
      <Image src={star} alt="" width={12} height={12} className="mr-1" />
    ));
  };
  return renderStar();
};

export default Stars;
