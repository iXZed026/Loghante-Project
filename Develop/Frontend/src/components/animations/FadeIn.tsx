"use client";
import { slowTransitionOut } from "@/lib/animations/transitions";
import { Children } from "@/types/children";
import { motion, Transition } from "framer-motion";

interface IFadeIn {
  children: Children;
  transition?: Transition;
}

function FadeIn({
  children,
  transition = slowTransitionOut,
}: IFadeIn) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        amount: 0.2,
      }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;