import { BiSolidPencil } from "react-icons/bi";
import { useAppDispatch } from "../../../app/hooks";
import { BudgetCategory, BudgetCategoryType } from "../../../types/PersonalFinance/Budget";
import { useState } from "react";
import FormComponent from "../../../shared/components/Form/FormComponent";
import BudgetEditCategoryModal from "./Modals/BudgetEditCategoryModal";
import { updateBudgetCategory } from "../../../app/actions/personalFinance/budget";

interface IEditCategoryBtnProps {
  category: BudgetCategory;
  categoryTypes: BudgetCategoryType[];
  fetchAllData: () => void;
}

export default function EditCategoryBtn(props: IEditCategoryBtnProps) {
  const dispatch = useAppDispatch();

  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (formValues: any) => {
    console.log(formValues);
    await dispatch(updateBudgetCategory(props.category.id, {
      ...props.category,
      categoryName: formValues.categoryName,
      categoryTypeId: formValues.categoryTypeId,
    }));
    props.fetchAllData();
    setIsEditCategoryModalOpen(false);
  }

  return (
    <>
      <button
        className="cursor-pointer scale-light"
        onClick={() => { setIsEditCategoryModalOpen(true) }}
      >
        <div className="flex gap-1">
          <BiSolidPencil className="text-sky-600" size={18} />
          <span className="text-sm text-gray-700">Edit</span>
        </div>
      </button>
      {isEditCategoryModalOpen && <BudgetEditCategoryModal
        children={<FormComponent
          schema={[
            {
              label: 'Category name',
              name: 'categoryName',
              type: 'text',
              initValue: props.category.categoryName,
              placeholder: 'Enter category name',
              required: true
            },
            {
              label: 'Category Type',
              name: 'categoryTypeId',
              type: 'select',
              initValue: props.category.categoryTypeId,
              placeholder: 'Select your category type',
              required: true,
              options: props.categoryTypes.map(v => ({ label: v.type, value: v.id }))
            },
          ]}
          onFormSubmit={onFormSubmit}        
        />}
        onClose={() => setIsEditCategoryModalOpen(false)}
      />}
    </>
  )
}
