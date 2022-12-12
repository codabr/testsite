import React, { FC } from "react";

interface _Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  mt?: string;
}

const Button: FC<_Button> = ({
  bgColor,
  borderColor,
  textColor,
  mt,
  children,
}) => {
  return (
    <button
      className="px-5  rounded-3xl min-w-[150px] w-auto md:w-[200px] h-12 flex justify-around items-center"
      style={{
        backgroundColor: bgColor ? bgColor : "transparent",
        border: borderColor && `1px solid ${borderColor}`,
        color: borderColor ? borderColor : "white",
        marginTop: mt ? mt : "auto",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
