import Link from "next/link";
import React from "react";
import { restuarentCardType } from "../page";
import RestuarentCardPrice from "./RestuarentCardPrice";
import Stars from "./Stars";

interface Props {
  restuarent: restuarentCardType;
}

const Card = ({ restuarent }: Props) => {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restuarent/${restuarent.slug}`}>
        <img src={restuarent.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restuarent.name}</h3>
          <div className="flex items-center">
            <Stars reviews={restuarent.reviews} />
            <p className="ml-2">{restuarent.reviews.length} review
            {restuarent.reviews.length === 1 ? "": "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restuarent.region.name}</p>
            <RestuarentCardPrice price={restuarent.price} />
            <p className="ml-3">{restuarent.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
