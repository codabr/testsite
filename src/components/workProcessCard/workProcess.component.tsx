import React, { useEffect } from "react";
import Image from "next/image";
import { renderDocument } from "../document/renderDocument";
import { useInView } from "react-intersection-observer";
import { options } from "../../utils/animations";
import { motion, useAnimation } from "framer-motion";

const WorkProcessCard = ({ phase, index }: any) => {
  const { icon, title, subTitle, description } = phase.fields;

  const [ref, inView] = useInView(options);
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: { delay: index * 0.2 },
      });
    }
    !inView &&
      animation.start({
        y: 100,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="flex flex-col items-start bg-white rounded-md p-5 mb-5 "
    >
      <div>
        <Image
          src={"https:" + icon.fields.file.url}
          alt="icon"
          width="50px"
          height="50px"
          className="text-blue grayscale"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <div>
          <p className="font-semibold text-hs-black text-md">
            {title}
            <span className="text-sm font-thin"> ({subTitle})</span>
          </p>
        </div>
        <div>
          <span className=" text-hs-text text-sm mt-3 text-ellipsis ">
            {renderDocument(description)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkProcessCard;
