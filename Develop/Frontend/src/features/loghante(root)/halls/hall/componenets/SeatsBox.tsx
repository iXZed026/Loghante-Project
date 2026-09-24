import React from "react";

import {
    cn,
} from "@/lib/utils/cn";

interface SeatsBoxProps {
    seatNum: number;
    selected: boolean;
    onClick: () => void;
}

function SeatsBox({
    seatNum,
    selected,
    onClick,
}: SeatsBoxProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={cn(
                "size-12",
                "shrink-0",
                "rounded-xl",
                "fcc",
                "border",
                "border-[var(--black-light-color)]",
                "cursor-pointer",
                "transition-all",
                "duration-200",

                selected
                    ? [
                        "bg-crimson",
                        "border-crimson",
                        "text-white",
                        "scale-105",
                        "shadow-md",
                    ]
                    : [
                        "bg-white",
                        "hover:bg-[var(--crimson-opacity-color)]",
                        "hover:border-crimson",
                    ],
            )}
        >
            <span>
                {seatNum}
            </span>
        </button>
    );
}

export default SeatsBox;