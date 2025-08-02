import { BudgetCategory, BudgetItem } from '../../../types/PersonalFinance/Budget';
import FormComponent from '../../../shared/components/Form/FormComponent';
import BudgetItemModal from './Modals/BudgetItemModal';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { deleteBudgetItem, updateBudgetItem } from '../../../app/actions/personalFinance/budget';
import BudgetItemDelete from './Modals/BudgetItemDelete';
import { FaTrash } from 'react-icons/fa6';
import { formatToIndianCurrency } from '../../../helpers';
import { RiPencilFill } from 'react-icons/ri';

interface IBudgetItemComponentProps {
  item: BudgetItem;
  categories: BudgetCategory[];
  fetchAllData: () => void;
}

export default function BudgetItemComponent(props: IBudgetItemComponentProps) {
  const dispatch = useAppDispatch();
  const [isBudgetItemModalOpen, setIsBudgetItemModalOpen] = useState(false);
  const [isBudgetItemDeleteModalOpen, setIsBudgetItemDeleteModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmitBudgetItem = async (formValues: any) => {
    await dispatch(updateBudgetItem(props.item.id, {
      ...formValues,
      description: '',
      categoryId: props.item.categoryId,
      actualAmount: +formValues.actualAmount || 0,
      allocatedAmount: 0,
      month: props.item.month,
      year: props.item.year,
      status: 'active',
      currencyCode: 'INR',
    }));
    props.fetchAllData();
    setIsBudgetItemModalOpen(false);
  }

  const onDeleteClickHandler = async () => {
    await dispatch(deleteBudgetItem(props.item.id));
    props.fetchAllData();
  }

  return (
    <div
      key={props.item.id}
      className="flex justify-between px-2 py-2 text-gray-600 rounded-md text-sm"
    >
      <span>{props.item.itemName}</span>
      <div className="flex gap-3">
        <span>₹ {formatToIndianCurrency(props.item.actualAmount)}</span>
        <div className='flex gap-2'>
          <RiPencilFill size={16} className="scale-light relative top-0.5 cursor-pointer text-sky-600" onClick={() => setIsBudgetItemModalOpen(true)} />
          <FaTrash size={15} className='scale-light relative top-0.5 text-red-400 cursor-pointer' onClick={() => setIsBudgetItemDeleteModalOpen(true)} />
        </div>
      </div>
      {isBudgetItemModalOpen && <BudgetItemModal
        children={<FormComponent
          schema={[
            {
              label: 'Name',
              name: 'itemName',
              type: 'text',
              initValue: props.item.itemName,
              placeholder: 'Enter name',
              required: true
            },
            {
              label: 'Amount',
              name: 'actualAmount',
              type: 'number',
              initValue: props.item.actualAmount.toString(),
              placeholder: 'Enter amount',
              required: true
            },
          ]}
          onFormSubmit={onFormSubmitBudgetItem}        
        />}
        onClose={() => setIsBudgetItemModalOpen(false)}
      />}
      {isBudgetItemDeleteModalOpen && <BudgetItemDelete
        onClose={() => setIsBudgetItemDeleteModalOpen(false)}
        onSubmit={onDeleteClickHandler}
      />}
    </div>
  )
}
