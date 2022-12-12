import React, { useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { options } from "../../utils/animations";
import { motion, useAnimation } from "framer-motion";

interface PropTypes {
  technologies: any;
}

const TechnologyCard = ({ tech, index }: any) => {
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
      animate={animation}
      ref={ref}
      className="flex flex-col md:flex-row justify-center items-center 
      space-y-4 md:space-y-0 md:justify-start md:space-x-6 p-8  bg-hs-bg "
    >
      <Image
        src={"https:" + tech.fields.file.url}
        alt="icon"
        width="50px"
        height="50px"
      />
      <p className="text-center text-xl ml-0">{tech.fields.title}</p>
    </motion.div>
  );
};
export default TechnologyCard;
