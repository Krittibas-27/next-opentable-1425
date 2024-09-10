import Navbar from "@/app/components/Navbar";
import React from "react";
import ReatuarentHeader from "../component/ReatuarentHeader";
import ReatuarentNavbar from "../component/ReatuarentNavbar";
import Header from "@/app/components/Header";
import { PrismaClient } from "@prisma/client";
import RestuarentMenu from "../component/RestuarentMenu";

const prisma = new PrismaClient();

const getRestuarentMenu = async (slug: string) => {
  const menu = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      items: true,
    },
  });
  if (!menu) {
    throw new Error;
  }
  return menu.items;
};

const RestaurantMenuPage = async ({ params }: { params: { slug: string } }) => {
  const items = await getRestuarentMenu(params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <ReatuarentNavbar slug={params.slug} />
        <RestuarentMenu items={items} />
      </div>
    </>
  );
};

export default RestaurantMenuPage;
