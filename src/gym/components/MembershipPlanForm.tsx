import { useState } from "react";

export interface MembershipPlanFormValues {
  name: string;
  duration: string;
  features: string[];
  cancellation_policy: string[];
  price: number;
  discount: string;
  status: string;
}

interface IMembershipPlanFormProps {
  formValues?: MembershipPlanFormValues;
  onFormSubmit: (formValues: MembershipPlanFormValues) => void;
}

export default function MembershipPlanForm(props: IMembershipPlanFormProps) {
  const [formValues, setFormValues] = useState<MembershipPlanFormValues>(props.formValues || {
    name: '',
    duration: '',
    features: [],
    cancellation_policy: [],
    price: 10,
    discount: '',
    status: 'active',
  });
  const [errors, setErrors] = useState<Partial<MembershipPlanFormValues>>({});

  const validateForm = (): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};

    if (!formValues.name) newErrors.name = "Plan name is required.";
    if (!formValues.duration) newErrors.duration = "Plan duration is required.";
    if (!formValues.price) newErrors.price = 'Price is required';

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
      formValues.features = [];
      formValues.cancellation_policy = [];
      formValues.price = +formValues.price;
      props.onFormSubmit(formValues);
    }
  };

  return (
    <div className="p-8">
      <div className="form-container mt-10">
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'Plan name'}>
          <label htmlFor={'plan-name'} className="block mb-2 text-md font-medium text-gray-900">
            Plan name <span className="text-red-500">*</span>
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'name'}
              id={'plan-name'}
              value={formValues['name']}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['name' as keyof MembershipPlanFormValues] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors['name' as keyof MembershipPlanFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['name' as keyof MembershipPlanFormValues]}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'duration'}>
          <label htmlFor="duration" className="block mb-2 text-md font-medium text-gray-900">
            Plan duration <span className="text-red-500">*</span>
          </label>
          <div className="col-span-2">
            <select
              name="duration"
              id="duration"
              value={formValues.duration}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['duration' as keyof MembershipPlanFormValues] ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select plan duration</option>
              {['monthly', 'quarterly', 'annually'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* features */}
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key='features'>
          <label htmlFor="features" className="block mb-2 text-md font-medium text-gray-900">
            Features
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'features'}
              id={'features'}
              value={formValues['features']}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            />
          </div>
        </div>

        {/* Cancellation policy */}
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key='cancellation_policy'>
          <label htmlFor="cancellation_policy" className="block mb-2 text-md font-medium text-gray-900">
          Cancellation policy
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'cancellation_policy'}
              id={'cancellation_policy'}
              value={formValues['cancellation_policy']}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            />
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'Price'}>
          <label htmlFor={'price'} className="block mb-2 text-md font-medium text-gray-900">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="col-span-2">
            <input
              type={'number'}
              name={'price'}
              id={'price'}
              value={formValues['price']}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['price' as keyof MembershipPlanFormValues] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors['price' as keyof MembershipPlanFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['price' as keyof MembershipPlanFormValues]}
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'status'}>
          <label htmlFor="status" className="block mb-2 text-md font-medium text-gray-900">
            Status
          </label>
          <div className="col-span-2">
            <select
              name="status"
              id="status"
              value={formValues.status}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            >
              {['active', 'inactive'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Discount */}
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key='discount'>
          <label htmlFor="discount" className="block mb-2 text-md font-medium text-gray-900">
            Discount
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'discount'}
              id={'discount'}
              value={formValues['discount']}
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
    </div>
  )
}
