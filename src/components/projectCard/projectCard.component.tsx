import React, { FC, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { renderDocument } from "../../components/document/renderDocument";
import Image from "next/image";
import Button from "../../components/button";
import Link from "next/link";
export const ProjectCardLeftImage = ({
  imageUrl,
  name,
  excerpt,
  slug,
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: { type: "spring", duration: 1.5, delay: 0.2 },
      });
    }
    !isInView &&
      animation.start({
        y: 100,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);
  return (
    <motion.div
      ref={ref}
      animate={animation}
      className={`flex justify-between space-x-10 mb-10 bg-white p-4 animate-in rounded shadow-md
      }`}
    >
      <Image
        src={imageUrl}
        alt=""
        width="500px"
        height="300px"
        objectFit="cover"
      />
      <div className="flex flex-col space-y-5 w-[60%]">
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className="text-justify">{renderDocument(excerpt)}</span>
        <Link href={"/portfolio/" + slug}>
          <a>
            <Button
              borderColor="#003B5C"
              textColor="#003B5C"
              className="mt-auto"
            >
              Read more
            </Button>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};

export const ProjectCardRightImage = ({
  imageUrl,
  name,
  excerpt,
  slug,
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: { type: "spring", duration: 1.5, delay: 0.2 },
      });
    }
    !isInView &&
      animation.start({
        y: 100,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);
  return (
    <motion.div
      ref={ref}
      animate={animation}
      key={name}
      className="flex justify-between mb-10 bg-white p-4 rounded shadow-md animate-in"
    >
      <div className="flex flex-col space-y-5 w-[60%] mr-10">
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className="text-justify">{renderDocument(excerpt)}</span>
        <Link href={"/portfolio/" + slug}>
          <a>
            <Button
              borderColor="#003B5C"
              textColor="#003B5C"
              className="mt-auto"
            >
              Read more
            </Button>
          </a>
        </Link>
      </div>
      <Image
        src={imageUrl}
        alt=""
        width="500px"
        height="300px"
        objectFit="cover"
      />
    </motion.div>
  );
};

export const MobileProjectCard = ({ imageUrl, name, excerpt, slug }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: { type: "spring", duration: 1.5, delay: 0.2 },
      });
    }
    !isInView &&
      animation.start({
        y: 100,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);
  return (
    <motion.div
      ref={ref}
      animate={animation}
      key={name}
      className="flex flex-col justify-between mb-10 bg-white p-4 rounded shadow-md animate-in"
    >
      <div className="flex items-center flex-col space-y-5 w-full sm:text-2xl">
        <Image
          src={imageUrl}
          alt=""
          width="500px"
          height="300px"
          objectFit="cover"
        />
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className="text-justify">{renderDocument(excerpt)}</span>
        <Link href={"/portfolio/" + slug}>
          <a>
            <Button
              borderColor="#003B5C"
              textColor="#003B5C"
              className="mx-auto self-center"
            >
              Read more
            </Button>
          </a>
        </Link>
      </div>
    </motion.div>
  );
};
