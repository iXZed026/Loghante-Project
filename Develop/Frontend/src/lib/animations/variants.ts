import { Variants } from "framer-motion";
import { defaultTransitionOut, fastTransitionIn } from "./transitions";

export const dropdownVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -10
    },
    visible: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -10
    }
}

export const openSlideMenu: Variants = {
    hidden: {
        left: -500,
    },

    visible: {
        left: 0,
        transition: defaultTransitionOut,
    },

    exit: {
        left: -500,
        transition: fastTransitionIn,
    },
};