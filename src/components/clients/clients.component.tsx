import React, { FC, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { listTransition, options } from "../../utils/animations";

const ClientsLogos = ({ clientsData }: any) => {
  const [ref, inView] = useInView(options);
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 0.5,
        transition: { type: "spring", delay: 0.2 },
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
    <div className="flex  flex-col items-center justify-center w-full">
      <motion.div
        ref={ref}
        animate={animation}
        className="grid grid-cols-2 content-around  md:grid-cols-4 lg:grid-cols-6 w-full"
      >
        {clientsData.map((client: any) => {
          return (
            <div
              key={client.fields.file.url}
              className="w-full h-18 flex justify-center grayscale opacity-40 "
            >
              <Image
                src={`https:${client.fields.file.url}`}
                alt="client"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ClientsLogos;
