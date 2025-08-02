import { useNavigate } from "react-router";
import { addItems } from "../../../app/actions/gym/inventory";
import { useAppDispatch } from "../../../app/hooks";
import { Equipment } from "../../../types/Inventory";
import FormComponent from "../../components/FormComponent";
import PageHeading from "../../components/PageHeading";

export interface AddInventoryDescriptionFormValues {
  status: 'available' | 'maintenance' | 'decommissioned';
  equipmentId: string;
};

export interface IAddNewEquipmentProps {
  equipments: Equipment[];
}

export default function AddNewEquipment(props: IAddNewEquipmentProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (formValues: { count: number; equipment: string; }) => {
    for (let i=0; i<formValues.count; i++) {
      const [err] = await dispatch(addItems({
        status: 'available',
        equipmentId: formValues.equipment,
      }));
      if (err) {
        console.log('Error', err);
        return;
      }
      navigate('/gym/admin/inventory/list');
    }
  }

  return (
    <div className="p-4 flex flex-col gap-10">
      <div className="flex justify-between">
        <PageHeading
          title="Add inventory description"
          description="Add new inventory description"
        />
      </div>

      <div className="max-w-[30rem]">
        <FormComponent
          schema={[
            {
              name: 'equipment',
              label: 'Equipment',
              type: 'select',
              placeholder: 'Select your equipment',
              required: true,
              initValue: "",
              options: props.equipments.map(v => ({ value: v.id, label: v.name })),
            },
            {
              name: 'count',
              label: 'Count',
              type: 'number',
              placeholder: '',
              required: true,
              initValue: 1
            },
          ]}
          onFormSubmit={onFormSubmit}
        />
      </div>
    </div>
  )
}
