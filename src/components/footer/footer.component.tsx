import React, { useEffect, useState, FC } from "react";
import { navItems } from "../../utils/navItems";
import Logo from "../logo";
import Link from "next/link";
import { client } from "../../lib/contentful";
import Image from "next/image";

const Footer: FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [socialIconsData, setSocialIconsData] = useState({} as any);

  const getData = async () => {
    const response = await client.getEntries({ content_type: "footer" });
    const data = response.items[0];
    setSocialIconsData(data.fields);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-12 pb-6 px-5 md:px-[5%] lg:px-[10%]">
      <div className="flex flex-col">
        <Logo color="#003B5C" />
      </div>
      <div className="flex space-x-5 mt-5">
        {navItems.map((item) => (
          <Link href={item.url} key={item.url}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center w-full mt-20 text-slate-400">
        <p>{`© Copyright ${currentYear} Hyperstack AB`}</p>
        <div className="flex w-20 justify-between">
          {socialIconsData.socialIcons &&
            socialIconsData.socialIcons.map((icon: any) => {
              return (
                <div
                  key={icon.fields.file.url}
                  className="w-full flex justify-center grayscale opacity-70 cursor-pointer  hover:grayscale-0 hover:opacity-100 "
                >
                  <Link href={icon.fields.description}>
                    <a>
                      <Image
                        src={`https:${icon.fields.file.url}`}
                        alt="client"
                        width="20%"
                        height="20%"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
