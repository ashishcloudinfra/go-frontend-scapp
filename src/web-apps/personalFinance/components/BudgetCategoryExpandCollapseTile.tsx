import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { BudgetCategory, BudgetCategoryType, BudgetItem } from "../../../types/PersonalFinance/Budget"
import EditCategoryBtn from "./EditCategoryBtn";
import { useMemo, useState } from "react";
import DeleteCategoryBtn from "./DeleteCategoryBtn";
import { formatToIndianCurrency } from "../../../helpers";
import { BsThreeDots } from "react-icons/bs";

interface IBudgetCategoryExpandCollapseTileProps {
  category: BudgetCategory;
  budgetItems: BudgetItem[];
  isExpanded: boolean;
  categoryTypes: BudgetCategoryType[];
  categoryClickHandler: (key: string) => void;
  fetchAllData: () => void;
}

export default function BudgetCategoryExpandCollapseTile(props: IBudgetCategoryExpandCollapseTileProps) {
  const [isActionIconClicked, setIsActionIconClicked] = useState(false);
  const categoryTypeMap = useMemo(() => props.categoryTypes.reduce((memo, curr) => ({
    ...memo,
    [curr.id]: curr
  }), {} as Record<string, BudgetCategoryType>), [props.categoryTypes]);

  const totalValue = useMemo(() => props.budgetItems.filter(item => item.categoryId === props.category.id).reduce((sum, curr) => sum+curr.actualAmount, 0), [props.budgetItems, props.category])

  return (
    <div className="flex gap-2">
      <div
        className="rounded-xl px-4 py-2 flex justify-between grow basis-0 cursor-pointer shadow-md border-gray-300 border-1 bg-gray-50"
        onClick={() => props.categoryClickHandler(props.category.id)}
      >
        <div className="flex gap-2 py-2">
          <span
            className="w-2 h-full rounded-sm"
            style={{
              backgroundColor: categoryTypeMap[props.category.categoryTypeId]?.bgColor || '',
            }}
          ></span>
          <span className="font-semibold">{props.category.categoryName}</span>
        </div>
        <div className="flex gap-6">
          {!!totalValue && <p className="text-md text-gray-700 font-semibold self-center">₹ {formatToIndianCurrency(totalValue)}</p>}
          <button className="cursor-pointer bg-gray-200 p-2 rounded-full">
            {props.isExpanded && <span>
              <FaAngleUp className="relative -top-0.5" />
            </span>}
            {!props.isExpanded && <span>
              <FaAngleDown className="relative -top-0.5" />
            </span>}
          </button>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-md relative justify-center">
        <BsThreeDots className="cursor-pointer" onClick={() => setIsActionIconClicked(!isActionIconClicked)} />
        {isActionIconClicked && <div className="absolute flex flex-col gap-2 right-0 z-20 top-8 bg-gray-50 rounded-md p-2 outline-2 outline-gray-200">
          <EditCategoryBtn
            category={props.category}
            categoryTypes={props.categoryTypes}
            fetchAllData={props.fetchAllData}
          />
          <DeleteCategoryBtn
            category={props.category}
            categoryTypes={props.categoryTypes}
            fetchAllData={props.fetchAllData}
          />
        </div>}
      </div>
    </div>
  )
}
