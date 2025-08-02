import { FaPlus } from "react-icons/fa6";
import { BudgetCategory, BudgetCategoryType, BudgetItem, CategoryType } from "../../../types/PersonalFinance/Budget";
import { Fragment, useMemo, useState } from "react";
import BudgetItemComponent from "./BudgetItemComponent";
import FormComponent from "../../../shared/components/Form/FormComponent";
import BudgetCategoryModal from "./Modals/BudgetCategoryModal";
import { addBudgetCategory, addBudgetItem } from "../../../app/actions/personalFinance/budget";
import { useAppDispatch } from "../../../app/hooks";
import BudgetItemModal from "./Modals/BudgetItemModal";
import BudgetCategoryExpandCollapseTile from "./BudgetCategoryExpandCollapseTile";
import { formatToIndianCurrency } from "../../../helpers";

const CategoryArrangement: CategoryType[] = ['Income', 'Investment', 'Saving', 'Expense', 'Other'];

interface IBudgetCategoryComponentProps {
  selectedMonth: number;
  selectedYear: number;
  categories: BudgetCategory[];
  categoryTypes: BudgetCategoryType[];
  budgetItems: BudgetItem[];
  fetchAllData: () => void;
}

export default function BudgetCategoryComponent(props: IBudgetCategoryComponentProps) {
  const dispatch = useAppDispatch();

  const [expandedCategory, setExpandedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBudgetItemModalOpen, setIsBudgetItemModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (formValues: any) => {
    await dispatch(addBudgetCategory({
      ...formValues,
      month: props.selectedMonth,
      year: props.selectedYear,
      parentId: '',
      categoryDescription: '',
    }));
    props.fetchAllData();
    setIsCategoryModalOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmitBudgetItem = async (formValues: any) => {
    await dispatch(addBudgetItem({
      ...formValues,
      description: '',
      categoryId: selectedCategoryId,
      actualAmount: +formValues.actualAmount || 0,
      month: props.selectedMonth,
      year: props.selectedYear,
      allocatedAmount: 0,
      status: 'active',
      currencyCode: 'INR',
    }));
    props.fetchAllData();
    setIsBudgetItemModalOpen(false);
  }
  
  const categoryBudgetItemMap = useMemo(() => props.categories.reduce((memo, curr) => ({
    ...memo,
    [curr.id]: props.budgetItems.filter(item => item.categoryId === curr.id)
  }), {} as Record<string, BudgetItem[]>), [props.categories, props.budgetItems]);

  const categoryMap = useMemo(() => props.categories.reduce((memo, curr) => ({
    ...memo,
    [curr.id]: curr
  }), {} as Record<string, BudgetCategory>), [props.categories]);

  const categoryTypeMap = useMemo(() => props.categoryTypes.reduce((memo, curr) => ({
    ...memo,
    [curr.id]: curr
  }), {} as Record<string, BudgetCategoryType>), [props.categoryTypes]);

  const remainingAmount = useMemo(() => {
    const totalIncome = props.budgetItems.reduce((acc, curr) => {
      if (categoryTypeMap[categoryMap?.[curr.categoryId]?.categoryTypeId]?.type === 'Income') return acc + curr.actualAmount;
      return acc;
    }, 0);

    const allValuesOtherThanIncome = props.budgetItems.reduce((acc, curr) => {
      if (categoryTypeMap[categoryMap?.[curr.categoryId]?.categoryTypeId]?.type !== 'Income') return acc + curr.actualAmount;
      return acc;
    }, 0);

    return totalIncome - allValuesOtherThanIncome;
  }, [props.budgetItems, categoryMap, categoryTypeMap]);

  const categoryClickHandler = (key: string) => {
    if (key === expandedCategory) {
      setExpandedCategory('');
      return;
    }
    setExpandedCategory(key);
  }

  const onAddNewBudgetItemClickHandler = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsBudgetItemModalOpen(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 text-md">
        <h3>Remaining amount</h3>
        {remainingAmount < 0 && <span className="bg-red-200 p-1 rounded-sm text-sm">Rs. {formatToIndianCurrency(remainingAmount)}</span>}
        {remainingAmount >= 0 && <span className="">Rs. {formatToIndianCurrency(remainingAmount)}</span>}
      </div>
      <div className="flex flex-col gap-5">
        {CategoryArrangement.map(ca => {
          return <div key={ca} className="flex flex-col gap-5">
            {Object.keys(categoryBudgetItemMap).map(k => {
              return <Fragment key={k}>
                {categoryTypeMap[categoryMap[k].categoryTypeId].type === ca && <div key={k} className="flex flex-col gap-3">
                  <BudgetCategoryExpandCollapseTile
                    category={categoryMap[k]}
                    budgetItems={props.budgetItems}
                    isExpanded={expandedCategory === k}
                    categoryTypes={props.categoryTypes}
                    categoryClickHandler={categoryClickHandler}
                    fetchAllData={props.fetchAllData}
                  />
                  {expandedCategory === k && <div key={k} className="flex flex-col px-5 pr-10">
                    {categoryBudgetItemMap[k].map((item, idx) => <div className="border-l-1 border-gray-300">
                      <div className="py-1">
                        <BudgetItemComponent
                          key={item.id}
                          item={item}
                          categories={props.categories}
                          fetchAllData={props.fetchAllData}
                        />
                      </div>
                      {categoryBudgetItemMap[k].length-1 !== idx && <div className="px-2">
                        <hr className="text-gray-300" />
                      </div>}
                    </div>)}
                    <button
                      type="button"
                      className="w-fit basis-0 cursor-pointer grow flex gap-1 scale-light py-1.5 px-3 my-3 text-sm font-semibold text-sky-600 focus:outline-none rounded-md"
                      onClick={() => onAddNewBudgetItemClickHandler(k)}
                    >
                      <FaPlus className="relative top-0.5" /> Add new entry
                    </button>
                  </div>}
                </div>}
              </Fragment>
            })}
          </div>
        })}
        {!props.categories.length && <div className="text-gray-600">Add a budget category to get started</div>}
        <button
          type="button"
          className="w-fit self-end flex gap-1 scale-light bg-primary cursor-pointer py-2.5 px-5 text-sm font-medium text-gray-100 focus:outline-none rounded-full border border-gray-400"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          <FaPlus className="relative top-0.5" /> Add category
        </button>
        {isCategoryModalOpen && <BudgetCategoryModal
          children={<FormComponent
            schema={[
              {
                label: 'Category name',
                name: 'categoryName',
                type: 'text',
                initValue: '',
                placeholder: 'Enter category name',
                required: true
              },
              {
                label: 'Category Type',
                name: 'categoryTypeId',
                type: 'select',
                initValue: '',
                placeholder: 'Select your category type',
                required: true,
                options: props.categoryTypes.map(v => ({ label: v.type, value: v.id }))
              },
            ]}
            onFormSubmit={onFormSubmit}        
          />}
          onClose={() => setIsCategoryModalOpen(false)}
        />}

        {isBudgetItemModalOpen && <BudgetItemModal
          children={<FormComponent
            schema={[
              {
                label: 'Name',
                name: 'itemName',
                type: 'text',
                initValue: '',
                placeholder: 'Enter name',
                required: true
              },
              {
                label: 'Amount',
                name: 'actualAmount',
                type: 'number',
                initValue: '',
                placeholder: 'Enter amount',
                required: true
              },
            ]}
            onFormSubmit={onFormSubmitBudgetItem}        
          />}
          onClose={() => setIsBudgetItemModalOpen(false)}
        />}
      </div>
    </div>
  )
}
