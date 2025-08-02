import { useAppDispatch } from "../../../app/hooks";
import { BudgetCategory, BudgetCategoryType } from "../../../types/PersonalFinance/Budget";
import { useState } from "react";
import { deleteBudgetCategory } from "../../../app/actions/personalFinance/budget";
import BudgetCategoryDelete from "./Modals/BudgetCategoryDelete";
import { FaTrash } from "react-icons/fa6";

interface IEditCategoryBtnProps {
  category: BudgetCategory;
  categoryTypes: BudgetCategoryType[];
  fetchAllData: () => void;
}

export default function DeleteCategoryBtn(props: IEditCategoryBtnProps) {
  const dispatch = useAppDispatch();

  const [isBudgetCategoryDeleteModalOpen, setIsBudgetCategoryDeleteModalOpen] = useState(false);

  const onFormSubmit = async () => {
    await dispatch(deleteBudgetCategory(props.category.id));
    props.fetchAllData();
    setIsBudgetCategoryDeleteModalOpen(false);
  }

  return (
    <>
      <button
        className="cursor-pointer scale-light"
        onClick={() => { setIsBudgetCategoryDeleteModalOpen(true) }}
      >
        <div className="flex gap-1">
          <FaTrash className="text-rose-400" size={16} />
          <span className="text-sm text-gray-700">Delete</span>
        </div>
      </button>
      {isBudgetCategoryDeleteModalOpen && <BudgetCategoryDelete
        onClose={() => setIsBudgetCategoryDeleteModalOpen(false)}
        onSubmit={onFormSubmit}
      />}
    </>
  )
}
