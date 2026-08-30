import FadeUp from '@/components/animations/FadeUp';
import { DayOfTheWeek } from '@/data/days-of-the-week';
import { dayOfTheWeeksVariant } from '@/features/loghante(root)/animations/loghante.variants';
import { fastTransitionOut } from '@/lib/animations/transitions';
import { cn } from '@/lib/utils/cn';

function MuseumsTourDayOfWeekBox() {

  const date = new Date();

  const todayNum = date.getDate();

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  return (
    <>
      {DayOfTheWeek.map((day, key) => (
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
            "click-scale cursor-pointer"
          )}
        >
          <span className="font-bold text-lg">
            {day.dayOTWeek}
          </span>

          <span>
            {`${todayNum + Number(key)} ${month}`}
          </span>
        </FadeUp>
      ))}
    </>
  );
}

export default MuseumsTourDayOfWeekBox;