import React from "react";
import { Item } from "@prisma/client";
import RestuarentMenuCard from "./RestuarentMenuCard";

const RestuarentMenu = ({ items }: { items: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {
          items.length ? (
            <div className="flex flex-wrap justify-between">
              {items.map((item: Item) => (
                <RestuarentMenuCard item={item} key={item.id}/>
              ))}
            </div>
          ): (
            <div className="flex flex-wrap justify-between">
              <h4>Menu not avaliable</h4>
            </div>
          )
        }
      </div>
    </main>
  );
};

export default RestuarentMenu;
