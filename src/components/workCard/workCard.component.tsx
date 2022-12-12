import React, { FC, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectType } from "../../../types";
import { renderDocument } from "../document/renderDocument";
import Button from "../../components/button";
import { listTransition, options } from "../../utils/animations";
import Link from "next/link";

type PropTypes = {
  project: ProjectType;
  index: number;
};

export const WorkCard: FC<PropTypes> = ({ project, index }) => {
  const { name, excerpt, image } = project?.fields;
  const imageUrl = image && image.fields.file.url;

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

  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="relative group min-h-[300px] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
        height: "300px",
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col absolute rounded-b p-3 bg-hs-blue w-full h-[250px] top-full text-white transform transition duration-300 group-hover:-translate-y-[250px]">
        <h1 className="text-2xl font-bold">{name}</h1>
        <span className="text-md mt-2">{renderDocument(excerpt)}</span>
        <div className="mt-auto">
          <Button bgColor="transparent" borderColor="white">
            <Link href="/portfolio">
              <a>Read more</a>
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
