import { useState, FC } from 'react';
import { monthNames } from '../../../helpers';

interface MonthYearPickerProps {
  initialMonth?: number;
  initialYear?: number;
  isDisabledFromCurrentMonth?: boolean;
  onChange?: (month: number, year: number) => void;
}

export const MonthYearPicker: FC<MonthYearPickerProps> = ({
  initialMonth,
  initialYear,
  isDisabledFromCurrentMonth,
  onChange
}) => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(initialYear ?? currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialMonth ?? currentDate.getMonth()
  );

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    if (onChange) {
      onChange(monthIndex, year);
    }
  };

  const handlePrevYear = () => {
    setYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  return (
    <div className="w-full max-w-sm p-4 mx-auto border border-gray-300 text-gray-700 rounded-md text-sm">
      {/* Year Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevYear}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition"
        >
          &larr; {year - 1}
        </button>
        <h2 className="font-semibold text-lg">{year}</h2>
        <button
          onClick={handleNextYear}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={isDisabledFromCurrentMonth && (year + 1) > currentDate.getFullYear()}
        >
          {year + 1} &rarr;
        </button>
      </div>

      {/* Months Grid */}
      <div className="grid grid-cols-3 gap-2">
        {monthNames.map((monthName, index) => {
          const isSelected = selectedMonth === index;
          return (
            <button
              key={monthName}
              onClick={() => handleMonthClick(index)}
              className={`
                text-center py-2 border border-gray-300 rounded cursor-pointer 
                hover:bg-gray-100 transition disabled:bg-gray-200 disabled:cursor-not-allowed
                ${isSelected ? 'bg-blue-100 font-semibold' : ''}
              `}
              disabled={isDisabledFromCurrentMonth && (year === currentDate.getFullYear() && index - 1 > currentDate.getMonth())}
            >
              {monthName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
