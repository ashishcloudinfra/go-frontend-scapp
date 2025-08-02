import { useState } from "react";
import { EventRoomFormFormValues } from "../../types/EventRoom";

interface IAddEventRoomFormFormProps {
  formValues?: EventRoomFormFormValues;
  onFormSubmit: (formValues: EventRoomFormFormValues) => void;
}

export default function AddEventRoomForm(props: IAddEventRoomFormFormProps) {
  const [formValues, setFormValues] = useState<EventRoomFormFormValues>(props.formValues || {
    name: '',
    capacity: '',
    location: '',
    isUnderMaintenance: false,
    startTime: '',
    endTime: ''
  });
  const [errors, setErrors] = useState<Partial<EventRoomFormFormValues>>({});

  const validateForm = (): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};

    if (!formValues.name) newErrors.name = "Plan name is required.";
    if (!formValues.capacity) newErrors.capacity = "Room capacity is required.";

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
    <div className="p-8">
      <div className="form-container mt-10">
        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'Plan name'}>
          <label htmlFor={'plan-name'} className="block mb-2 text-md font-medium text-gray-900">
            Room name <span className="text-red-500">*</span>
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'name'}
              id={'plan-name'}
              value={formValues['name']}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['name' as keyof EventRoomFormFormValues] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors['name' as keyof EventRoomFormFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['name' as keyof EventRoomFormFormValues]}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key={'Room capacity'}>
          <label htmlFor={'capacity'} className="block mb-2 text-md font-medium text-gray-900">
            Room capacity <span className="text-red-500">*</span>
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'capacity'}
              id={'capacity'}
              value={formValues.capacity}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors['capacity' as keyof EventRoomFormFormValues] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors['capacity' as keyof EventRoomFormFormValues] && (
              <p className="text-red-500 text-sm">
                {errors['capacity' as keyof EventRoomFormFormValues]}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key='location'>
          <label htmlFor="location" className="block mb-2 text-md font-medium text-gray-900">
            Location
          </label>
          <div className="col-span-2">
            <input
              type={'text'}
              name={'location'}
              id={'location'}
              value={formValues.location}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            />
          </div>
        </div>

        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key='startTime'>
          <label htmlFor="startTime" className="block mb-2 text-md font-medium text-gray-900">
            Room start time
          </label>
          <div className="col-span-2">
            <div className="flex">
                <input name="startTime" type="time" id="startTime" className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formValues.startTime} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" key='endTime'>
          <label htmlFor="endTime" className="block mb-2 text-md font-medium text-gray-900">
            Room end time
          </label>
          <div className="col-span-2">
            <div className="flex">
                <input name="endTime" type="time" id="endTime" className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formValues.endTime} onChange={handleChange} />
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
