import { useState } from "react";

export interface AddInventoryDescriptionFormValues {
  name: string;
  category: string;
};

interface IAddInventoryCategoryFormProps {
  formValues?: AddInventoryDescriptionFormValues;
  onFormSubmit: (formValues: AddInventoryDescriptionFormValues) => void;
};

export default function AddInventoryCategoryForm(props: IAddInventoryCategoryFormProps) {
  const [formValues, setFormValues] = useState<AddInventoryDescriptionFormValues>(props.formValues || {
    name: '',
    category: '',
  });
  const [errors, setErrors] = useState<Partial<AddInventoryDescriptionFormValues>>({});

  const validateForm = (): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};

    if (!formValues.name) newErrors.name = "Inventory name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      props.onFormSubmit(formValues);
    }
  };

  return (
    <div>
      <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'inventoty-name'}>
        <label htmlFor={'name'} className="block mb-2 text-md font-medium text-gray-900">
          Inventory name <span className="text-red-500">*</span>
        </label>
        <div className="col-span-2">
          <input
            type={'text'}
            name={'name'}
            id={'name'}
            value={formValues.name}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors['capacity' as keyof AddInventoryDescriptionFormValues] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors['name' as keyof AddInventoryDescriptionFormValues] && (
            <p className="text-red-500 text-sm">
              {errors['name' as keyof AddInventoryDescriptionFormValues]}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'category'}>
        <label htmlFor={'category'} className="block mb-2 text-md font-medium text-gray-900">
          Inventory category
        </label>
        <div className="col-span-2">
          <input
            type={'text'}
            name={'category'}
            id={'category'}
            value={formValues.category}
            onChange={handleChange}
            className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
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
  )
}
