import { useMemo, useState } from "react";
import PageHeading from "../../../../components/PageHeading";
import { AssetItem } from "../../../../types/PersonalFinance/Asset";
import FormComponent from "../../../../shared/components/Form/FormComponent";
import Modal from "../../components/Modal";
import { useAppDispatch } from "../../../../app/hooks";
import { addAssetItem, deleteAssetItem, updateAssetItem } from "../../../../app/actions/personalFinance/asset";
import { formatToIndianCurrency } from "../../../../helpers";
import { FaTrash } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";

export interface IGoldProps {
  assetTypes: string[];
  assetItems: AssetItem[];
  fetchAssetItems: () => void;
}

export default function Gold(props: IGoldProps) {
  const dispatch = useAppDispatch();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AssetItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const assetItems = useMemo(() => {
    return props.assetItems.filter(v => v.AssetType === 'Gold');
  }, [props.assetItems])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (formValues: any) => {
    await dispatch(addAssetItem({
      ...formValues,
      currentValue: 0.0,
      assetType: 'Gold',
      code: 'GOLD',
      ownerName: '',
      avgBuyValue: +formValues.avgBuyValue,
      totalUnits: +formValues.totalUnits,
    }));
    setIsAddDialogOpen(false);
    props.fetchAssetItems();
  }

  const onDeleteClickHandler = async () => {
    if (selectedItem) {
      await dispatch(deleteAssetItem(selectedItem.Id));
      props.fetchAssetItems();
      setSelectedItem(null);
    }
    setIsDeleteDialogOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditSubmitClickHandler = async (formValues: any) => {
    if (selectedItem) {
      await dispatch(updateAssetItem(selectedItem.Id, {
        ...formValues,
        currentValue: 0.0,
        assetType: 'Gold',
        code: 'GOLD',
        ownerName: '',
        avgBuyValue: +formValues.avgBuyValue,
        totalUnits: +formValues.totalUnits,
      }));
      props.fetchAssetItems();
      setSelectedItem(null);
    }
    setIsEditDialogOpen(false);
  }

  console.log(props.assetItems);
  return (
    <div className="flex flex-col gap-4 items-start">
      <PageHeading
        title="Gold"
        description="Manage/Add your cash"
      />

      <button
        className="bg-primary scale-light cursor-pointer text-gray-100 py-2 px-3 rounded-md"
        onClick={() => setIsAddDialogOpen(true)}
      >
        Add new entry
      </button>

      <ul className="w-full flex flex-col gap-2">
        {assetItems.map(v => <li
          key={v.Id}
          className="bg-gray-100 border-2 border-gray-300 px-3 py-2 rounded-lg"
        >
          <div className="flex justify-between">
            <span className="text-gray-700">{v.Name}</span>
            <div className="flex gap-4 flex-wrap">
              <span className="text-gray-700">Rs. {formatToIndianCurrency((v.AvgBuyValue || 0)*(v.TotalUnits || 0))}</span>
              <div className='flex gap-2'>
                <MdEditSquare size={20} className="scale-light relative top-0.5 cursor-pointer text-sky-600" onClick={() => { setIsEditDialogOpen(true); setSelectedItem(v) }} />
                <FaTrash size={18} className='scale-light relative top-0.5 text-red-400 cursor-pointer' onClick={() => { setIsDeleteDialogOpen(true); setSelectedItem(v); }} />
              </div>
            </div>
          </div>
        </li>)}
      </ul>
      {isAddDialogOpen && <Modal
        title="Add new item"
        children={<FormComponent
          schema={[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              initValue: '',
              required: true
            },
            {
              label: 'Buy value(per gram)',
              name: 'avgBuyValue',
              type: 'number',
              initValue: '',
              required: true
            },
            {
              label: 'Total grams',
              name: 'totalUnits',
              type: 'number',
              initValue: '',
              required: true
            },
          ]}
          onFormSubmit={onFormSubmit}
        />}
        onClose={() => setIsAddDialogOpen(false)}
      />}
      {isEditDialogOpen && <Modal
        title="Update item"
        children={<FormComponent
          schema={[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              initValue: selectedItem?.Name || '',
              required: true
            },
            {
              label: 'Buy value(per gram)',
              name: 'avgBuyValue',
              type: 'number',
              initValue: selectedItem?.AvgBuyValue || '',
              required: true
            },
            {
              label: 'Total grams',
              name: 'totalUnits',
              type: 'number',
              initValue: selectedItem?.TotalUnits || '',
              required: true
            },
          ]}
          onFormSubmit={onEditSubmitClickHandler}        
        />}
        onClose={() => setIsEditDialogOpen(false)}
      />}
      {isDeleteDialogOpen && <Modal
        showFooter={true}
        onClose={() => setIsDeleteDialogOpen(false)}
        onSecondaryBtnClickHandler={() => setIsDeleteDialogOpen(false)}
        onPrimaryBtnClickHandler={onDeleteClickHandler}
      />}
    </div>
  )
}
