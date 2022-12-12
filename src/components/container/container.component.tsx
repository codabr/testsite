import React, { FC, useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideRight } from "../../utils/animations";

export const Container = ({
  bgColor,
  flexDirection,
  minHeight,
  title,
  children,
}: any) => {
  const options = {
    threshold: 0.2,
    triggerOnce: true,
  };
  const [ref, inView] = useInView(options);
  const animation = useAnimation();
  const slideRightStyle = slideRight(inView);

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        transition: { when: "beforeChildren" },
      });
    }
    !inView &&
      animation.start({
        opacity: 0,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="flex justify-center items-center w-full py-12 px-5 md:px-[5%] lg:px-[10%]"
      style={{
        backgroundColor: bgColor,
        flexDirection: flexDirection || "row",
        minHeight: minHeight ?? "300px",
      }}
    >
      <h1
        ref={ref}
        className="text-hs-black text-mobileTitle md:text-title"
        style={slideRightStyle}
      >
        {title}
      </h1>
      {children}
    </motion.div>
  );
};
