import { monthNames } from "../../helpers";

interface IMonthSelectorProps {
  selectedValue: string;
  onChange: (month: string) => void;
}

export default function MonthSelector(props: IMonthSelectorProps) {
  return (
    <div>
      <select
        name={'month-selector'}
        id={'month-selector'}
        value={props.selectedValue}
        onChange={(e) => props.onChange(e.target.value)}
        className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      >
        {monthNames.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  )
}
