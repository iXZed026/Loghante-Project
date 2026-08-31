"use client";

import FadeUp from "@/components/animations/FadeUp";
import { DayOfTheWeek } from "@/data/days-of-the-week";
import { dayOfTheWeeksVariant } from "@/features/loghante(root)/animations/loghante.variants";
import { fastTransitionOut } from "@/lib/animations/transitions";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "next-intl";
import { formatDate } from "@/lib/utils/date";

function MuseumsTourDayOfWeekBox() {

  const locale = useLocale();

  const today = new Date();

  function getDateByOffset(offset: number) {
    const date = new Date(today);

    date.setDate(
      today.getDate() + offset
    );

    return date;
  }

  return (
    <>
      {DayOfTheWeek.map((day, index) => {

        const currentDate =
          getDateByOffset(index);

        return (
          <FadeUp
            variants={dayOfTheWeeksVariant}
            transition={fastTransitionOut}
            once={true}
            key={day.id}
            className={cn(
              "col-span-1",
              "min-w-0",
              "py-6",
              "fcol gap-5",
              "border-[1px] border-black-opacity",
              "shadow-xl",
              "rounded-xl",
              "text-center",
              "hover:bg-[var(--crimson-color)] hover:text-white",
              "click-scale cursor-pointer select-none"
            )}
          >
            <span className="font-bold text-lg">
              {getLocalizedValue(
                day.dayOTWeek,
                locale
              )}
            </span>

            <span>
              {formatDate(currentDate,locale)}
            </span>
          </FadeUp>
        );
      })}
    </>
  );
}

export default MuseumsTourDayOfWeekBox;