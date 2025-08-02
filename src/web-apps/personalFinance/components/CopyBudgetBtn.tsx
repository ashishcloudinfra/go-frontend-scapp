import { MonthYearPicker } from "./MonthYearPicker";
import { useState } from "react";
import MonthYearPickerModal from "./Modals/MonthYearPickerModal";
import { FaCopy } from "react-icons/fa6";
import Alert from "../../../components/Alert";

interface ICopyBudgetBtnProps {
  selectedMonth: number;
  selectedYear: number;
  onChange: (month: number, year: number) => void;
}

export default function CopyBudgetBtn(props: ICopyBudgetBtnProps) {
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
        <FaCopy size={22} className="relativme" /> Copy Budget
      </button>

      {isPickerModalOpen && <MonthYearPickerModal
        title="Select month from which you want to copy budget"
        description={<Alert
          type="WARNING"
          message="This will delete all the data from current month"
        />}
        children={<MonthYearPicker
          initialMonth={props.selectedMonth}        
          initialYear={props.selectedYear}
          onChange={handleMonthYearChange}
        />}
        onClose={() => setIsPickerModalOpen(false)}
      />}
    </div>
  )
}
