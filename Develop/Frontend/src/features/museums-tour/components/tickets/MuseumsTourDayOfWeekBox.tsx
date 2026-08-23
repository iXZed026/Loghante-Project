import { DayOfTheWeek } from '@/data/days-of-the-week';
import { cn } from '@/lib/utils/cn';

function MuseumsTourDayOfWeekBox() {

  const date = new Date()
  const todayNum = date.getDate();
  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  return (
    <>
      {DayOfTheWeek.map((day, key) => (
        <div
          key={day.id}
          className={cn(
            "col-span-1",
            "py-6",
            "fcol gap-5",
            "border-[1px] border-black-opacity",
            "shadow-xl",
            "rounded-xl",
            "text-center",
          )}
        >
          <span className='font-bold text-lg'>
            {day.dayOTWeek}
          </span>
          <span>
            {`${(todayNum + Number(key))}  ${month}`}
          </span>
        </div>
      ))}
    </>
  )
}

export default MuseumsTourDayOfWeekBox