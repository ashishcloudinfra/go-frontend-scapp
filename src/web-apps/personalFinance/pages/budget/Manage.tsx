import PageHeading from "../../../../components/PageHeading";
import { BudgetCategory, BudgetCategoryType, BudgetItem } from "../../../../types/PersonalFinance/Budget";
import BudgetCategoryComponent from "../../components/BudgetCategoryComponent";
import ChangeMonthBtn from "../../components/ChangeMonthBtn";
import { monthNames } from "../../../../helpers";
import CopyBudgetBtn from "../../components/CopyBudgetBtn";
import { useAppDispatch } from "../../../../app/hooks";
import { copyBudget } from "../../../../app/actions/personalFinance/budget";

export interface IManageBudgetProps {
  selectedMonth: number;
  selectedYear: number;
  categories: BudgetCategory[];
  categoryTypes: BudgetCategoryType[];
  budgetItems: BudgetItem[];
  fetchAllData: () => void;
  onMonthChangeHandler: (month: number, year: number) => void;
}

export default function Manage(props: IManageBudgetProps) {
  const dispatch = useAppDispatch();

  const onCopyBudgetBtnClickHandler = async (month: number, year: number) => {
    console.log('copy budget', month, year);
    await dispatch(copyBudget({
      oldMonth: month,
      oldYear: year,
      currentMonth: props.selectedMonth,
      currentYear: props.selectedYear,
    }));
    props.fetchAllData();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Manage budget"
        description="Manage budget"
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex flex-wrap justify-between gap-2">
            <ChangeMonthBtn
              selectedMonth={props.selectedMonth}
              selectedYear={props.selectedYear}
              onChange={props.onMonthChangeHandler}
            />
            <CopyBudgetBtn
              selectedMonth={props.selectedMonth}
              selectedYear={props.selectedYear}
              onChange={onCopyBudgetBtnClickHandler}
            />
          </div>
          <div className="text-sm text-gray-600 self-end">Showing budget for <span className="bg-indigo-500 text-gray-50 p-0.5 rounded-xs">{monthNames[props.selectedMonth]} {props.selectedYear}</span></div>
        </div>

        <BudgetCategoryComponent
          selectedMonth={props.selectedMonth}
          selectedYear={props.selectedYear}
          categories={props.categories}
          budgetItems={props.budgetItems}
          categoryTypes={props.categoryTypes}
          fetchAllData={props.fetchAllData}
        />
      </div>
    </div>
  )
}
