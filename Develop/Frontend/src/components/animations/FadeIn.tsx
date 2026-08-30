"use client";
import { slowTransitionOut } from "@/lib/animations/transitions";
import { Children } from "@/types/children";
import { motion, Transition } from "framer-motion";

interface IFadeIn {
  children: Children;
  transition?: Transition;
  className?: string
  once?: boolean
}

function FadeIn({
  children,
  transition = slowTransitionOut,
  className,
  once = false,
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
        once,
      }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;