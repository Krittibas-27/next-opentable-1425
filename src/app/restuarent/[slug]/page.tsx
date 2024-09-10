import Navbar from "@/app/components/Navbar";
import React from "react";
import ReatuarentHeader from "./component/ReatuarentHeader";
import ReatuarentNavbar from "./component/ReatuarentNavbar";
import RestuarentTitlebar from "./component/RestuarentTitlebar";
import RestuarentRating from "./component/RestuarentRating";
import RestuarentDesc from "./component/RestuarentDesc";
import RestuarentImage from "./component/RestuarentImage";
import { PrismaClient, Review } from "@prisma/client";
import ReviewCard from "./component/ReviewCard";
import { notFound } from "next/navigation";
import Reservation from "./component/Reservation";

interface Props {
  params: {
    slug: string;
  };
}
interface fetchDataType {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string
  reviews: Review[]
}

const prisma = new PrismaClient();

const fetchRestuarent = async (slug: string): Promise<fetchDataType> => {
  const restuarentDetails = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
      reviews: true
    },
  });
  if (!restuarentDetails) {
    //throw new Error;
    notFound()
  }
  return restuarentDetails;
};

const RestuarentDetailPage = async ({ params }: Props) => {
  const getRestuarent = await fetchRestuarent(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <ReatuarentNavbar slug={getRestuarent.slug} />
        <RestuarentTitlebar title={getRestuarent.name} />
        <RestuarentRating reviews={getRestuarent.reviews} />
        <RestuarentDesc description={getRestuarent.description} />
        <RestuarentImage images={getRestuarent.images} />

        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
            What {getRestuarent.reviews.length} {""}{getRestuarent.reviews.length ===1 ? "person" : "people"} are saying
          </h1>
          <div>
            {
              getRestuarent.reviews.map((review)=>(
                <ReviewCard review={review} key={review.id}/>
              ))
            }
            
            
          </div>
        </div>
      </div>
      <Reservation/>
    </>
  );
};

export default RestuarentDetailPage;
