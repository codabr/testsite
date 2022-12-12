export const slideRight = (isInView: boolean) => {
  return {
    transform: isInView ? "none" : "translateX(-200px)",
    opacity: isInView ? 1 : 0,
    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
  };
};

export const listTransition = (index: number) => {
  return { type: "spring", duration: 1.5, delay: index * 0.5 };
};

export const options = {
  threshold: 0.2,
  triggerOnce: true,
};
