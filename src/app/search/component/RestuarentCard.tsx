
import React from "react";
import RestuarentCardPrice from "@/app/components/RestuarentCardPrice";
import { Location, PRICE, Region, Review } from "@prisma/client";
import Link from "next/link";
import { calculateReviewAvarage } from "@/utils/calculateReviewAvarage";
import Stars from "@/app/components/Stars";

interface RestuarentProps {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  location: Location;
  region: Region;
  reviews: Review[]
}

const RestuarentCard = ({ restuarent }: { restuarent: RestuarentProps }) => {
  const renderAvarage = ()=>{
    const rating = calculateReviewAvarage(restuarent.reviews)
    if(rating > 4) return "Awesome"
    else if(rating <= 4 && rating >3) return "Good"
    else if(rating <= 3 && rating >0) return "Avarage"
    else return ""
  }
  return (
    <div className="border-b flex pb-5">
      <img src={restuarent.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restuarent.name}</h2>
        <div className="flex items-center mb-1">
          <Stars reviews={restuarent.reviews} />
          <p className="ml-2 text-sm">{renderAvarage()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <RestuarentCardPrice price={restuarent.price}/>
            <p className="mr-4">{restuarent.region.name}</p>
            <p className="mr-4">{restuarent.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restuarent/${restuarent.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestuarentCard;
