import { useEffect, useState } from "react"
import { DayKey, weekDaysName } from "../../helpers";

export type MonthRepeatOnSelectorType = 'Date' | 'Day';

export type MonthWeekNumber = 'First' | 'Second' | 'Third' | 'Fourth' | 'Last';
const MonthWeekNumberOptions: MonthWeekNumber[] = ['First', 'Second', 'Third', 'Fourth', 'Last'];

export interface onChangeParam {
  selectorType: MonthRepeatOnSelectorType,
  monthDate: string,
  monthWeekNumber: MonthWeekNumber,
  selectedWeekDay: DayKey
}

interface IDateOrDaySelectorProps {
  onChange: ({ selectorType, monthDate, monthWeekNumber, selectedWeekDay }: onChangeParam) => void; 
}

export default function DateOrDaySelector(props: IDateOrDaySelectorProps) {
  const [selectorType, setSelectorType] = useState<MonthRepeatOnSelectorType>('Date');
  const [monthDate, setMonthDate] = useState<string>('1');
  const [monthWeekNumber, setMonthWeekNumber] = useState<MonthWeekNumber>('First');
  const [selectedWeekDay, setSelectedWeekDay] = useState<DayKey>('Monday');

  useEffect(() => {
    // console.log('DateOrDaySelector', selectorType, monthDate, monthWeekNumber, selectedWeekDay);
    props.onChange({ selectorType, monthDate, monthWeekNumber, selectedWeekDay });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorType, monthDate, monthWeekNumber, selectedWeekDay])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, callBack: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callBack(e.target.value as any);
  }

  return (
    <div>
      <div className="date-selector flex gap-4 place-items-center">
        <input type="radio" id="date-selector" name="date-or-day-selector" value={'Date'} checked={selectorType === 'Date'} onChange={(e) => onChangeHandler(e, setSelectorType)} />
        <label htmlFor="date-selector">
          <select key={'month-date-select'} disabled={selectorType !== 'Date'} value={monthDate} onChange={(e) => onChangeHandler(e, setMonthDate)} className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            {Array(31).fill(1).map((_, idx) => <option key={idx+1} value={idx+1}>{idx+1}</option>)}
          </select>
        </label>
        <span>day</span>
      </div>
      <div className="date-selector flex gap-4 mt-4">
        <input type="radio" id="month-week-selector" name="month-week-selector" value={'Day'} checked={selectorType === 'Day'} onChange={(e) => onChangeHandler(e, setSelectorType)} />
        <label htmlFor="month-week-selector">
          <select key={'month-week-select'} disabled={selectorType !== 'Day'} value={monthWeekNumber} onChange={(e) => onChangeHandler(e, setMonthWeekNumber)} className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            {MonthWeekNumberOptions.map((val) => <option key={val} value={val}>{val}</option>)}
          </select>
        </label>
        <label htmlFor="week-day-selector">
          <select key={'week-day-select'} id="week-day-selector" name="week-day-selector" disabled={selectorType !== 'Day'} value={selectedWeekDay} onChange={(e) => onChangeHandler(e, setSelectedWeekDay)} className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            {weekDaysName.map((val) => <option key={val} value={val}>{val}</option>)}
          </select>
        </label>
      </div>
    </div>
  )
}
