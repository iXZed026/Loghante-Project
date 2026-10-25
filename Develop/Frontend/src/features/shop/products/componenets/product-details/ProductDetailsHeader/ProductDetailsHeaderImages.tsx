"use client";

import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCompress,
} from "react-icons/fa6";

import AppImage from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import ArrowIcon from "@/components/shared/ArrowIcon";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

const PRODUCT_IMAGES = [
  "/images/loghanteh-cafe.jpg",
  "/images/loghanteh-cafe.jpg",
  "/images/loghanteh-cafe.jpg",
  "/images/loghanteh-cafe.jpg",
];

function ProductDetailsHeaderImages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const T = 
    useTranslations("shopProductDetails.header")

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? PRODUCT_IMAGES.length - 1 : current - 1,
    );
    setIsZoomed(false);
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === PRODUCT_IMAGES.length - 1 ? 0 : current + 1,
    );
    setIsZoomed(false);
  };

  const selectImage = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
  };

  return (
    <div
      className={cn(
        "xl:col-span-5 lg:col-span-6 col-span-12 flex min-w-0 flex-col gap-4",
        "sm:flex-row sm:items-start sm:gap-3",
      )}
    >
      {/* Thumbnails */}
      <div
        className={cn(
          "order-2 flex md:gap-3 gap-2",
          "sm:order-1 sm:w-20 sm:shrink-0 sm:flex-col",
        )}
      >
        {PRODUCT_IMAGES.map((src, index) => (
          <Button
            key={`${src}-${index}`}
            type="button"
            onClick={() => selectImage(index)}
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg",
              "border-2 transition-colors duration-200 sm:w-20",
              activeIndex === index
                ? "border-[var(--blue-color)]"
                : "border-transparent hover:border-black/20",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]",
              "p-0",
            )}
          >
            <AppImage
              src={src}
              width={160}
              height={160}
              alt={`Product thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </Button>
        ))}
      </div>

      {/* Main image and controls */}
      <div className="order-1 flex min-w-0 flex-1 flex-col gap-3 sm:order-2">
        <div
          className={cn(
            "group relative aspect-square w-full overflow-hidden rounded-xl",
            "bg-black/[0.02]",
          )}
        >
          <AppImage
            src={PRODUCT_IMAGES[activeIndex]}
            width={800}
            height={800}
            alt={`Product image ${activeIndex + 1}`}
            className={cn(
              "h-full w-full object-cover",
              "transition-transform duration-300 ease-out",
              isZoomed ? "scale-150 cursor-zoom-out" : "scale-100",
            )}
          />

          {/* Previous */}
          <Button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className={cn(
              "absolute left-3 top-1/2 z-10 -translate-y-1/2",
              "flex size-10 items-center justify-center rounded-full",
              "bg-white/90 text-black shadow-md backdrop-blur-sm",
              "transition-colors duration-200 hover:bg-white",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)] cursor-pointer",
              "click-scale"
            )}
          >
            <ArrowIcon direction="left" />
          </Button>

          {/* Next */}
          <Button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className={cn(
              "absolute right-3 top-1/2 z-10 -translate-y-1/2",
              "flex size-10 items-center justify-center rounded-full",
              "bg-white/90 text-black shadow-md backdrop-blur-sm",
              "transition-colors duration-200 hover:bg-white",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]  cursor-pointer",
              "click-scale"
            )}
          >
            <ArrowIcon  />
          </Button>

          {/* Image counter */}
          <span
            className={cn(
              "absolute bottom-3 left-1/2 z-10 -translate-x-1/2",
              "rounded-full bg-black/60 px-3 py-1",
              "text-xs font-medium text-white backdrop-blur-sm",
            )}
          >
            {activeIndex + 1} / {PRODUCT_IMAGES.length}
          </span>
        </div>

        {/* Zoom button */}
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => setIsZoomed((current) => !current)}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            aria-pressed={isZoomed}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2",
              "text-sm text-blue-utility",
              "transition-colors duration-200",
              "hover:bg-[var(--blue-opacity-color)]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]",
              "cursor-pointer",
              "hover:text-[var(--blue-hover-color)]",
              "click-scale"
            )}
          >
            {isZoomed ? (
              <FaCompress size={15} />
            ) : (
              <FaExpand size={15} />
            )}

            <span>{isZoomed ? T("zoom-out") : T("zoom-in")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsHeaderImages;
