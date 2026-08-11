"use client"
import { slowTransitionOut } from "@/lib/animations/transitions"
import { Children } from "@/types/children"
import { motion } from "framer-motion"
import { Transition } from "framer-motion";

interface IFadeUp {
    children: Children;
    transition?: Transition;
    y?: number;
    amount?: number
}

function FadeUp({
    children,
    transition = slowTransitionOut,
    y = 50,
    amount = 0.2,
}: IFadeUp) {
    return (
        <motion.div
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
        >
            {children}
        </motion.div>
    )
}

export default FadeUp