import React from "react";
import { PRICE } from "@prisma/client";

const RestuarentCardPrice = ({ price }: { price: string }) => {
  const priceStatus = () => {
    if (price === PRICE.CHEAP) {
      return (<><span>$$</span><span className="text-gray-400">$$</span></>)
    }else if(price === PRICE.REGULAR){
        return (<><span>$$$</span><span className="text-gray-400">$</span></>)
    }else{
        return <span>$$$$</span>
    }
  };
  return <p className="mr-3">{priceStatus()}</p>;
};

export default RestuarentCardPrice;
