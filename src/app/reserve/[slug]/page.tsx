import Navbar from "@/app/components/Navbar";
import React from "react";
import Header from "./component/Header";
import From from "./component/From";

const page = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <From />
      </div>
    </div>
  );
};

export default page;
