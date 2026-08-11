"use client"
import { Children } from "@/types/children"
import { motion, Variants } from "framer-motion"

interface StaggerWrapper {
    children: Children
    variants: Variants
    className?: string
}

function StaggerWrapper({
    children,
    variants,
    className
}: StaggerWrapper) {
    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
        >
            {children}
        </motion.div>
    )
}

export default StaggerWrapper