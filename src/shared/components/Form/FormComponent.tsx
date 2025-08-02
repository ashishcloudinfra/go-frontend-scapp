import { useState } from "react";
import { transformObject } from "../../../helpers";
import Select from "./Select";
import Input from "./Input";
import SelectWithSearch from "./SelectWithSearch";

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
  submitBtnBgColor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormSubmit: (formValues: any) => void;
}

export default function FormComponent(props: IFormComponentProps) {
  const [formValues, setFormValues] = useState(props.schema.reduce((memo, curr) => ({ ...memo, [curr.name]: curr.initValue }), {}));
  const [errors, setErrors] = useState<Partial<unknown>>({});

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
    console.log('*** in handle submit');
    if (validateForm()) {
      props.onFormSubmit(transformObject(formValues));
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {props.schema.map(({ label, name, type, placeholder, required, options }) => {
          if (type === 'select') {
            return <div className="" key={name}>
              <Select
                label={label}
                name={name}
                required={required || false}
                placeholder={placeholder}
                options={options || []}
                selectedValue={(formValues as never)[name]}
                error={errors[name as keyof unknown]}
                handleChange={handleChange}
              />
            </div>
          }
          if (type === 'select-with-search') {
            return <div className="" key={name}>
              <SelectWithSearch
                label={label}
                name={name}
                required={required || false}
                placeholder={placeholder}
                options={options || []}
                selectedValue={(formValues as never)[name]}
                error={errors[name as keyof unknown]}
                handleChange={handleChange}
              />
            </div>
          }
          return <div className="" key={name}>
            <Input
              label={label}
              name={name}
              required={required || false}
              type={type}
              placeholder={placeholder}
              value={(formValues as never)[name]}
              error={errors[name as keyof unknown]}
              handleChange={handleChange}
            />
          </div>
        })}
      </div>

      {!!props.schema.length && <div className="py-4">
        <button
          type="submit"
          className="w-full p-2 cursor-pointer text-sm text-gray-100 rounded-md scale-light"
          onClick={handleSubmit}
          style={{ backgroundColor: props.submitBtnBgColor || '#7f22fe' }}
        >
          Submit
        </button>
      </div>}
    </form>
  )
}
