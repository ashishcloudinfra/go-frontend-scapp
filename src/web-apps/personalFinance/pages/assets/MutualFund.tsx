import { useMemo, useState } from "react";
import PageHeading from "../../../../components/PageHeading";
import { AssetItem } from "../../../../types/PersonalFinance/Asset";
import FormComponent from "../../../../shared/components/Form/FormComponent";
import Modal from "../../components/Modal";
import { useAppDispatch } from "../../../../app/hooks";
import { addAssetItem, deleteAssetItem, fetchMutualFundLatestData, updateAssetItem } from "../../../../app/actions/personalFinance/asset";
import { formatToIndianCurrency } from "../../../../helpers";
import { FaTrash } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { IMutualNameAndCode } from "../../BootstrapPages/Asset/BootstrapMutualFund";

export interface IMutualFundProps {
  assetTypes: string[];
  assetItems: AssetItem[];
  mutualFundNames: IMutualNameAndCode[];
  fetchAssetItems: () => void;
}

export default function MutualFund(props: IMutualFundProps) {
  const dispatch = useAppDispatch();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AssetItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const assetItems = useMemo(() => {
    return props.assetItems.filter(v => v.AssetType === 'Mutual fund');
  }, [props.assetItems])

  const mfSelectOptions = useMemo(() => props.mutualFundNames.map(v => ({ label: v.schemeName, value: v.schemeCode.toString() })), [props.mutualFundNames]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (formValues: any) => {
    const mutualFundData = await fetchMutualFundLatestData(formValues.code || '');
    await dispatch(addAssetItem({
      ...formValues,
      name: formValues.name || mutualFundData.meta.scheme_name,
      currentValue: +mutualFundData.data[0].nav,
      assetType: 'Mutual fund',
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
      const mutualFundData = await fetchMutualFundLatestData(formValues.code || '');
      await dispatch(updateAssetItem(selectedItem.Id, {
        ...formValues,
        name: formValues.name || mutualFundData.meta.scheme_name,
        currentValue: +mutualFundData.data[0].nav,
        assetType: 'Mutual fund',
        ownerName: '',
        avgBuyValue: +formValues.avgBuyValue,
        totalUnits: +formValues.totalUnits,
      }));
      props.fetchAssetItems();
      setSelectedItem(null);
    }
    setIsEditDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      <PageHeading
        title="MutualFund"
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
              <span className="text-gray-700">Rs. {formatToIndianCurrency(parseInt(((v.CurrentValue || 0)*(v.TotalUnits || 0)).toString()))}</span>
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
              label: 'Mutual fund',
              name: 'code',
              type: 'select-with-search',
              initValue: '',
              options: mfSelectOptions,
              placeholder: 'Search your mutual fund here',
              required: true
            },
            {
              label: 'Name(Defaults to Fund name)',
              name: 'name',
              type: 'text',
              initValue: '',
              required: false
            },
            {
              label: 'Average NAV',
              name: 'avgBuyValue',
              type: 'number',
              initValue: '',
              required: true
            },
            {
              label: 'Total balanced units',
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
              label: 'Mutual fund',
              name: 'code',
              type: 'select-with-search',
              initValue: selectedItem?.Code || '',
              options: mfSelectOptions,
              required: true
            },
            {
              label: 'Name(Defaults to Fund name)',
              name: 'name',
              type: 'text',
              initValue: selectedItem?.Name || '',
              required: false
            },
            {
              label: 'Average NAV',
              name: 'avgBuyValue',
              type: 'number',
              initValue: selectedItem?.AvgBuyValue || '',
              required: true
            },
            {
              label: 'Total balanced units',
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
