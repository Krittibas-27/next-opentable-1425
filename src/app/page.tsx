import Header from "./components/Header";
import Card from "./components/Card";
import { PrismaClient, Location,Region, PRICE, Review } from "@prisma/client";

export interface restuarentCardType  {
  id: number,
  name: string,
  main_image: string,
  location: Location,
  region: Region,
  price: PRICE,
  slug: string,
  reviews : Review[]
}
const prisma = new PrismaClient();

const fetchRestuarents = async (): Promise<restuarentCardType[]> => {
  const restuarents = await prisma.restaurant.findMany({
    select:{
      id: true,
      name: true,
      main_image: true,
      location: true,
      region: true,
      price: true,
      slug: true,
      reviews: true
    }
  });
  if (!restuarents) {
    throw new Error;
  }
  return restuarents;
};
export default async function Home() {
  const restuarents = await fetchRestuarents();
  console.log(restuarents);
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restuarents.map((restuarent) => (
          <Card restuarent={ restuarent} key={restuarent.id}/>
        ))}
      </div>
    </main>
  );
}
