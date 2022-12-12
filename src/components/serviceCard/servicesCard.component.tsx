import React, { FC, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { renderDocument } from "../document/renderDocument";
import { useInView } from "react-intersection-observer";
import { listTransition, options } from "../../utils/animations";

type ServiceType = {
  title: string;
  subtitle: string;
  description: string;
  icon: File;
};
type PropTypes = {
  serviceData: any;
  index: number;
  col?: boolean;
};

const ServiceCard: FC<PropTypes> = ({ serviceData, index, col }) => {
  const [ref, inView] = useInView(options);
  const animation = useAnimation();
  const transition = listTransition(index);

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition,
      });
    }
    !inView &&
      animation.start({
        y: 100,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const { icon, title, description } = serviceData.fields;
  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="flex content-start max-w-[350px] min-h-[350px] h-auto lg:min-h-[400px]  p-5 rounded shadow-md"
      style={{ flexDirection: col ? "column" : "row" }}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="serviceCard_inner">
          <Image
            src={"https:" + icon.fields.file.url}
            alt="icon"
            width="80px"
            height="80px"
            className="grayscale"
          />
        </div>
        <div className="">
          <p className="font-semibold text-hs-black text-xl mt-3">{title}</p>
        </div>
        <div className="min-h-[150px]">
          <span className=" text-hs-text mt-3 text-justify ">
            {renderDocument(description)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
