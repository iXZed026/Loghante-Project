"use client";

import {
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

import { cn } from "@/lib/utils/cn";

interface ILazySectionProps {
    children: ReactNode;
    fallback?: ReactNode;
    className?: string;
    placeholderClassName?: string;
    rootMargin?: string;
    minHeight?: number | string;
    once?: boolean;
}

function LazySection({
    children,
    fallback,
    className,
    placeholderClassName,
    rootMargin = "300px 0px",
    minHeight = 320,
    once = true,
}: ILazySectionProps) {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;

        if (!element || isVisible || typeof IntersectionObserver === "undefined") {
            if (typeof IntersectionObserver === "undefined") {
                setIsVisible(true);
            }

            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                setIsVisible(true);

                if (once) {
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin,
                threshold: 0,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [isVisible, once, rootMargin]);

    return (
        <div
            ref={sectionRef}
            className={cn("w-full min-w-0", className)}
            style={
                isVisible
                    ? undefined
                    : {
                        minHeight:
                            typeof minHeight === "number"
                                ? `${minHeight}px`
                                : minHeight,
                    }
            }
            aria-busy={!isVisible}
        >
            {isVisible ? (
                children
            ) : (
                fallback ?? (
                    <div
                        className={cn(
                            "w-full animate-pulse rounded-xl bg-black/[0.04]",
                            placeholderClassName,
                        )}
                        style={{ minHeight }}
                        aria-hidden="true"
                    />
                )
            )}
        </div>
    );
}

export default LazySection;
