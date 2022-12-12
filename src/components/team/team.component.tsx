import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { renderDocument } from "../document/renderDocument";
import Link from "next/link";
import LinkedInIcon from "../../../public/linkedin.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { listTransition, options } from "../../utils/animations";

type PropTypes = {
  memberData: any;
  index: number;
};

const TeamMemberCard: FC<PropTypes> = ({ memberData, index }) => {
  const [ref, inView] = useInView(options);
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 10,
        opacity: 1,
        transition: { type: "spring", delay: index * 0.1 },
      });
    }
    !inView &&
      animation.start({
        y: 10,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const { name, jobTitle, description, linkedin, profilePicture } =
    memberData.fields;
  const imageUrl = profilePicture && profilePicture.fields.file.url;

  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="flex flex-col space-y-5 md:space-y-2 max-w-[350px] min-h-[180px]  bg-white  mb-16 items-center   p-3 rounded-lg shadow-lg transform transition duration-300 -translate-y-6"
    >
      <div className="w-[100px] h-[100px] rounded-full shadow-lg overflow-hidden -mt-16 -mb-3">
        <Image
          src={imageUrl && "https:" + imageUrl}
          alt="profile-picture"
          className="rounded-full"
          width="200px"
          height="200px"
          quality={100}
        />
      </div>
      <div className="flex flex-col items-center h-[100px]">
        <div className="flex flex-col items-center mx-8">
          <p className="text-lg text-center mt-3">{name}</p>
          <p className="text-slate-400 text-sm mb-3 font-thin">{jobTitle}</p>
        </div>
        <div className="relative mt-auto">
          {linkedin && (
            <Link href={`${linkedin}`} className="text-slate-300">
              <a>
                <Image
                  src={LinkedInIcon}
                  alt="icon"
                  width="20px"
                  height="20px"
                  className="cursor-pointer"
                />
              </a>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
