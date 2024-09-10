import { Review } from "@prisma/client";

export const calculateReviewAvarage = (review: Review[]) => {
    if(!review.length) return 0;
    //sum of all review / review length
   return review.reduce((sum, review)=>{
    return sum + review.rating;
   },0) / review.length
}
