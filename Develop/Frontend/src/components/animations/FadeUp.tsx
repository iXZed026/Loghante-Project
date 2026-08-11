"use client"
import { slowTransitionOut } from "@/lib/animations/transitions"
import { Children } from "@/types/children"
import { motion, Variants } from "framer-motion"
import { Transition } from "framer-motion";

interface IFadeUp {
    children: Children;
    transition?: Transition;
    y?: number;
    amount?: number
    variants?: Variants
    className?: string
}

function FadeUp({
    children,
    transition = slowTransitionOut,
    y = 50,
    amount = 0.2,
    variants,
    className
}: IFadeUp) {
    return (
        <motion.div
            variants={variants}
            initial={{
                opacity: 0,
                y: y,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            transition={transition}
            viewport={{
                amount: amount,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default FadeUp