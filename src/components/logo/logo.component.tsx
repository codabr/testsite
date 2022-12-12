import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../../public/logo.png";

type PropsType = {
  color?: string;
};
const Logo: FC<PropsType> = ({ color }) => {
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <Link href="/" className="m-0 p-0" passHref>
        <a>
          <Image
            src={LogoImg}
            alt=""
            width="50px"
            height="50px"
            layout="fixed"
            className="rounded-full border-0 bg-white"
          />
        </a>
      </Link>
      <Link href="/" passHref>
        <a>
          <p className="text-[35px] font-semibold ml-[7px]" style={{ color }}>
            HYPERSTACK
          </p>
        </a>
      </Link>
    </div>
  );
};

export default Logo;
