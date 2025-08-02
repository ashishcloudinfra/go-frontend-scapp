import { RiExchangeLine } from "react-icons/ri";
import { MonthYearPicker } from "./MonthYearPicker";
import { useState } from "react";
import MonthYearPickerModal from "./Modals/MonthYearPickerModal";

interface IChangeMonthBtnProps {
  selectedMonth: number;
  selectedYear: number;
  onChange: (month: number, year: number) => void;
}

export default function ChangeMonthBtn(props: IChangeMonthBtnProps) {
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);

  const handleMonthYearChange = (month: number, year: number) => {
    props.onChange(month, year);
    setIsPickerModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="flex gap-1 scale-light cursor-pointer py-2.5 px-5 text-sm text-gray-100 focus:outline-none bg-primary rounded-xl border-2 font-semibold"
        onClick={() => setIsPickerModalOpen(true)}
      >
        <RiExchangeLine size={22} className="relativme" /> Change month
      </button>

      {isPickerModalOpen && <MonthYearPickerModal
        children={<MonthYearPicker
          initialMonth={props.selectedMonth}        
          initialYear={props.selectedYear}
          isDisabledFromCurrentMonth={true}
          onChange={handleMonthYearChange}
        />}
        onClose={() => setIsPickerModalOpen(false)}
      />}
    </div>
  )
}
