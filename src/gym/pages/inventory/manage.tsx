import { Link } from "react-router";
import PageHeading from "../../components/PageHeading";
import { BiSolidAddToQueue } from "react-icons/bi";
import { EquipmentsByStatus, EquipmentStatus, UpdateEquipmentFormValues } from "../../../types/Inventory";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { useState } from "react";
import UpdateEquipmentStatusModal from "../../components/UpdateEquipmentStatusModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateItemStatus } from "../../../app/actions/gym/inventory";
import { capitalizeFirstLetter } from "../../../helpers";

export interface IInventoryManagementProps {
  itemTypes: EquipmentsByStatus;
  fetchData: (companyId: string) => void;
}

export default function InventoryManagement(props: IInventoryManagementProps) {
  const { selectedCompany } = useAppSelector(s => s.companies);
  const dispatch = useAppDispatch();

  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<EquipmentStatus>('available');

  const onUpdateStatusDialogCloseHandler = () => {
    setIsUpdateStatusDialogOpen(false);
  }

  const onFormSubmit = async (data: UpdateEquipmentFormValues) => {
    const [err] = await dispatch(updateItemStatus({
      ...data,
      count: parseInt(data.count, 10)
    }))
    if (err) {
      console.log('Error, ', err);
      return;
    }
    setIsUpdateStatusDialogOpen(false);
    props.fetchData(selectedCompany?.id || '');
  }

  return (
    <>
      {isUpdateStatusDialogOpen && <UpdateEquipmentStatusModal
        items={props.itemTypes.available}
        onClose={onUpdateStatusDialogCloseHandler}
        onFormSubmit={onFormSubmit}
      />}
      <div className="p-4 flex flex-col gap-10">
        <div className="flex justify-between">
          <PageHeading
            title="Manage inventory"
            description="Manage your inventory"
          />
          <div>
            <Link
              to={'/gym/admin/inventory/add-item'}
              type="button"
              className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
            >
              <BiSolidAddToQueue className="mr-2" size={20} />
              Add new item
            </Link>
            <button
              className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
              onClick={() => setIsUpdateStatusDialogOpen(!isUpdateStatusDialogOpen)}
            >
              <FaScrewdriverWrench className="mr-2" size={20} />
              Update item status
            </button>
          </div>
        </div>

        <div className="max-w-sm">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => { setSelectedStatus(e.target.value as EquipmentStatus) }}
          >
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="decommissioned">Decommissioned</option>
          </select>
        </div>

        <ul className="flex flex-wrap gap-4">
          {(props.itemTypes[selectedStatus] || []).map(item => <li
            key={item.id}
            className="px-4 py-3 w-[15rem] rounded-xl border-1 border-gray-300 shadow-lg"
          >
            <div className='flex items-center space-x-4'>
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"/>
              <div className="text-lg font-semibold text-gray-800 ">{item.name}</div>
            </div>
            <div className="m-2 text-sm text-gray-500">{capitalizeFirstLetter(selectedStatus)} - {item.count}</div>
          </li>)}
        </ul>
      </div>
    </>
  )
}
