import { DayKey, daysOfWeekMap, getDayShortName } from "../../helpers";

interface IDaySelectorProps {
  selectedDays: string[];
  toggleDay: (day: DayKey) => void;
}

const DaySelector = (props: IDaySelectorProps) => {
  return (
    <div className="flex space-x-1">
      {Object.keys(daysOfWeekMap).map((day, index) => (
        <label key={index} className="relative">
          <input
            type="checkbox"
            value={getDayShortName(day as DayKey)}
            checked={props.selectedDays.includes(day as DayKey)}
            onChange={() => props.toggleDay(day as DayKey)}
            className="hidden"
          />
          <div
            className={`flex items-center justify-center w-10 h-10 border rounded-md cursor-pointer ${
              props.selectedDays.includes(day)
                ? "bg-secondary text-white border-secondary"
                : "bg-primary text-white border-white"
            }`}
          >
            {
              getDayShortName(day as DayKey)
            }
          </div>
        </label>
      ))}
    </div>
  );
};

export default DaySelector;
