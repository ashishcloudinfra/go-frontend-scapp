import { useState } from "react";
import { MenuItemRequestBody } from "../../../../types/Restaurant/MenuItem";
import LabelAndInput from "../../../../components/LabelAndInput";
import { TiDeleteOutline } from "react-icons/ti";

interface IAddMenuItemFormProps {
  formValues?: MenuItemRequestBody;
  onFormSubmit: (formValues: MenuItemRequestBody) => void;
}

const Fields: { key: keyof MenuItemRequestBody; label: string; type: string, required?: boolean; placeholderText?: string; }[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "description", label: "Description", type: "text" },
  { key: "photo", label: "Photo URL", type: "text" },
  { key: "cookingTime", label: "Cooking time", type: "number", placeholderText: 'Enter mintues' },
  { key: "category", label: "Category(Eg. Starters)", type: "text", required: true },
];

export default function AddMenuItemForm(props: IAddMenuItemFormProps) {
  const [formValues, setFormValues] = useState<MenuItemRequestBody>(props.formValues || {
    name: '',
    description: '',
    photo: '',
    cookingTime: '',
    category: '',
    isVeg: true,
    addOns: [],
    varieties: [{
      name: 'default',
      price: '',
    }],
  });
  const [errors, setErrors] = useState<Partial<MenuItemRequestBody>>({});

  const validateForm = (): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};

    if (!formValues.name) newErrors.name = "Menu item name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setFormValues({ ...formValues, [name]: e.target.checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      props.onFormSubmit(formValues);
    }
  };

  const handleVarietyInputsChange = (index: number, value: { name: string; price: string; }) => {
    const newFormValues = structuredClone(formValues);
    newFormValues.varieties[index].name = value.name;
    newFormValues.varieties[index].price = value.price;
    setFormValues(newFormValues);
  }

  const onHandleAddVariety = () => {
    const newFormValues = structuredClone(formValues);
    newFormValues.varieties.push({
      name: '',
      price: '',
    });
    setFormValues(newFormValues);
  }

  const onHandleRemoveVariety = (index: number) => {
    const newFormValues = structuredClone(formValues);
    newFormValues.varieties.splice(index, 1);
    setFormValues(newFormValues);
  }

  return (
    <div className="p-8">
      <div className="form-container flex flex-col gap-3">
        {Fields.map((field) => (
          <LabelAndInput
            key={field.key}
            label={field.label}
            name={field.key}
            id={field.key}
            value={formValues[field.key as keyof MenuItemRequestBody] as string}
            type={field.type}
            required={!!field.required}
            error={errors[field.key as keyof MenuItemRequestBody] as string}
            placeholderText={field.placeholderText}
            onChange={handleChange}
          />
        ))}

        <div className="col-span-1 md:col-span-2">
          <label className="inline-flex items-center cursor-pointer">
            <span className="block mr-6 text-md font-medium text-gray-900">Is veg?</span>
            <input name="isVeg" type="checkbox" className="sr-only peer" checked={formValues.isVeg} onChange={handleChange} />
            <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        <div>
          {formValues.varieties.map((variety, idx) => <div key={idx} className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            <label htmlFor="variety1">Variety {idx+1} details {formValues.varieties[idx].name}</label>
            <div className="flex justify-between w-max gap-2">
              <input
                type='text'
                name={`Variety name ${idx+1}`}
                id={`varietyName${idx+1}`}
                value={variety.name}
                placeholder={`Variety name ${idx+1}`}
                onChange={(e) => handleVarietyInputsChange(idx, { name: e.target.value, price: variety.price })}
                className={`bg-gray-200 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              />
              <input
                type='number'
                name={`Variety price ${idx+1}`}
                id={`varietyPrice${idx+1}`}
                value={variety.price}
                placeholder={`Variety price ${idx+1}`}
                onChange={(e) => handleVarietyInputsChange(idx, { name: variety.name, price: e.target.value })}
                className={`bg-gray-200 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              />
              {(formValues.varieties.length > 1) && <button className="cursor-pointer" onClick={() => onHandleRemoveVariety(idx)}>
                <TiDeleteOutline size={30} className="text-red-800" />
              </button>}
            </div>
          </div>)}
          <div className="grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            <div className="flex">
              <button
                className="text-sky-600 cursor-pointer hover:bg-sky-100 scale-light px-2 py-1.5 rounded-sm"
                onClick={onHandleAddVariety}
              >
                + Add new variety
              </button>
            </div>
          </div>
        </div>

        <div className="grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-8">
          <button
            type="submit"
            className="w-full xs:col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 p-2 bg-linear-to-r from-[#455A64] to-[#546E7A] text-gray-300 rounded-sm hover:bg-[#285a54]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
