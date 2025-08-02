import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IManageBudgetProps } from "../pages/budget/Manage";
import { BudgetCategory, BudgetCategoryType, BudgetItem } from "../../../types/PersonalFinance/Budget";
import { getAllBudgetCategories, getAllBudgetCategoryTypes, getAllBudgetItems } from "../../../app/actions/personalFinance/budget";

export default function BootstrapManageBudget({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IManageBudgetProps> }) {
  const dispatch = useAppDispatch();
  const tokenData = useAppSelector(s => s.token.data);

  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<BudgetCategoryType[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());
  const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear());

  const onMonthChangeHandler = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  }

  const fetchCategories = async (month: number, year: number) => {
    const [err, data] = await dispatch(getAllBudgetCategories(month, year));
    if (err) {
      return;
    }
    setCategories(data || []);
  };

  const fetchCategoryTypes = async () => {
    const [err, data] = await dispatch(getAllBudgetCategoryTypes());
    if (err) {
      return;
    }
    setCategoryTypes(data || []);
  };

  const fetchBudgetItems = async (month: number, year: number) => {
    const [err, data] = await dispatch(getAllBudgetItems(month, year));
    if (err) {
      return;
    }
    setBudgetItems(data || []);
  };

  const fetchAllData = async () => {
    await fetchCategories(selectedMonth, selectedYear);
    fetchBudgetItems(selectedMonth, selectedYear);
  }

  useEffect(() => {
    fetchCategoryTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tokenData?.id) {
      return;
    }
    fetchAllData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear, tokenData]);

  return <WrappedComponent
    selectedMonth={selectedMonth}
    selectedYear={selectedYear}
    categories={categories}
    categoryTypes={categoryTypes}
    budgetItems={budgetItems}
    fetchAllData={fetchAllData}
    onMonthChangeHandler={onMonthChangeHandler}
  />;
}
