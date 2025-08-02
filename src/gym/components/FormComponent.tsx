import { useState } from "react";
import { EventRoomFormFormValues } from "../../types/EventRoom";
import { transformObject } from "../../helpers";

interface InputSchema {
  label: string;
  name: string;
  type: string;
  initValue: unknown;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface IFormComponentProps {
  schema: InputSchema[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormSubmit: (formValues: any) => void;
}

export default function FormComponent(props: IFormComponentProps) {
  const [formValues, setFormValues] = useState(props.schema.reduce((memo, curr) => ({ ...memo, [curr.name]: curr.initValue }), {}));
  const [errors, setErrors] = useState<Partial<EventRoomFormFormValues>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<unknown> = {};

    for (let i=0; i<props.schema.length; i++) {
      if (props.schema[i].required && !formValues[props.schema[i].name as keyof typeof formValues]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newErrors[props.schema[i].name] = `${props.schema[i].label} is required.`;
      }
    }

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
      props.onFormSubmit(transformObject(formValues));
    }
  };

  return (
    <div>
      <div>
        {props.schema.map(({ label, name, type, placeholder, required, options }) => {
          if (type === 'select') {
            return <div className="mb-4" key={name}>
              <label htmlFor={name} className="block mb-1 text-md font-medium text-gray-900">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <select
                name={name}
                id={name}
                value={(formValues as never)[name]}
                onChange={handleChange}
                className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors[name as keyof unknown] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">{placeholder || 'Select your option'}</option>
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[name as keyof unknown] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof unknown]}
                </p>
              )}
            </div>
          }
          return <div className="mb-4" key={name}>
            <label htmlFor={name} className="block mb-1 text-md font-medium text-gray-900">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={(formValues as never)[name]}
              placeholder={placeholder || ''}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors[name as keyof unknown] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[name as keyof unknown] && (
              <p className="text-red-500 text-sm">
                {errors[name as keyof unknown]}
              </p>
            )}
          </div>
        })}
      </div>

      {!!props.schema.length && <button
        type="submit"
        className="w-full p-2 bg-linear-to-r from-[#455A64] to-[#546E7A] text-gray-300 rounded-sm hover:bg-[#285a54]"
        onClick={handleSubmit}
      >
        Submit
      </button>}
    </div>
  )
}
