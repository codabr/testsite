import React from "react";

const TopContainer = ({
  bgColor,
  flexDirection,
  bgImage,
  marginTop,
  height,
  children,
}: any) => {
  return (
    <div
      className="flex -pt-[150px] justify-center items-center w-full h-[250px] md:min-h-[600px] py-12 px-5 md:px-[5%] lg:px-[10%]"
      style={{
        backgroundColor: bgColor,
        flexDirection: flexDirection || "row",
        marginTop: marginTop,
        height: height ? height : "auto",
        background: `linear-gradient(180deg, rgba(1,32,49,0.76) 35%, rgba(0,59,92,0.61) 100%),url(${bgImage}) 0px 0px/cover no-repeat`,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};
export default TopContainer;
