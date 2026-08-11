import { Variants } from "framer-motion";

export const MuseumsCardContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        }
    },
}

export const MuseumCardVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },

}