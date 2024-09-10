import React from "react";
import ReatuarentHeader from "./component/ReatuarentHeader";

const RastuarentLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) => {
  return (
    <>
      <ReatuarentHeader slug={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};

export default RastuarentLayout;
