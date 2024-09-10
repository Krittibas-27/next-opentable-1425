import { Location, PRICE, Region } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Sidebar = ({
  locations,
  regions,
  searchParams,
}: {
  locations: Location[];
  regions: Region[];
  searchParams: { city?: string; region?: string; price?: PRICE };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg font-light rounded-l p-2 text-center",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className:
        "border-r border-t border-b w-full text-reg font-light p-2 text-center",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className:
        "border-r border-t border-b w-full text-reg font-light p-2 rounded-r text-center",
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Location</h1>
        {locations &&
          locations.map((item: Location) => (
            <Link
              key={item.id}
              className="font-light text-reg capitalize flex flex-col"
              href={{
                pathname: "/search",
                query: { ...searchParams, city: item.name },
              }}
            >
              {item.name}
            </Link>
          ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Region</h1>
        {regions &&
          regions.map((item: Region) => (
            <Link
              key={item.id}
              className="font-light text-reg capitalize flex flex-col"
              href={{
                pathname: "/search",
                query: { ...searchParams, region: item.name },
              }}
            >
              {item.name}
            </Link>
          ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }, index) => (
            <Link
              className={className}
              key={index}
              href={{
                pathname: "/search",
                query: { ...searchParams, price },
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
