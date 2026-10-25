"use client";

import { useState } from "react";
import { FaExpand, FaCompress } from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import ArrowIcon from "@/components/shared/ArrowIcon";
import { cn } from "@/lib/utils/cn";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PRODUCT_IMAGES = [
  "/images/loghanteh-cafe.jpg",
  "/images/loghanteh-cafe.jpg",
  "/images/loghanteh-cafe.jpg",
  "/images/loghanteh-cafe.jpg",
];

function ProductDetailsHeaderImages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const t = useTranslations("shopProductDetails.header");
  const locale = useLocale();
  const isRTL = locale === "fa";

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
        "col-span-12 flex min-w-0 flex-col gap-4 lg:col-span-6 xl:col-span-5",
        "sm:flex-row sm:items-start sm:gap-3",
      )}
    >
      {/* Thumbnails */}
      <div
        className={cn(
          "order-2 flex gap-2 md:gap-3",
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
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg p-0 sm:w-20",
              "border-2 transition-colors duration-200",
              activeIndex === index
                ? "border-[var(--blue-color)]"
                : "border-transparent hover:border-black/20",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]",
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

          {/* Previous image */}
          <Button
            type="button"
            onClick={showPrevious}
            className={cn(
              "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center",
              "rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm",
              "transition-colors duration-200 hover:bg-white",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]",
              "click-scale",
              isRTL ? "end-3" : "start-3",
            )}
          >
            <MdKeyboardArrowLeft />
          </Button>

          {/* Next image */}
          <Button
            type="button"
            onClick={showNext}
            className={cn(
              "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center",
              "rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm",
              "transition-colors duration-200 hover:bg-white",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]",
              "click-scale",
              isRTL ? "start-3" : "end-3",
            )}
          >
            <MdKeyboardArrowRight />
          </Button>

          {/* Image counter */}
          <span
            dir="ltr"
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
            aria-label={isZoomed ? t("zoom-out") : t("zoom-in")}
            aria-pressed={isZoomed}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2",
              "text-sm text-blue-utility transition-colors duration-200",
              "hover:bg-[var(--blue-opacity-color)]",
              "hover:text-[var(--blue-hover-color)]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--blue-color)]",
              "click-scale",
            )}
          >
            {isZoomed ? (
              <FaCompress size={15} />
            ) : (
              <FaExpand size={15} />
            )}

            <span>{isZoomed ? t("zoom-out") : t("zoom-in")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsHeaderImages;