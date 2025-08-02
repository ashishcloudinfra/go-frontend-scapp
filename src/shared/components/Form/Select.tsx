import { FaAngleDown } from "react-icons/fa6";

interface ISelectProps {
  label?: string;
  name: string;
  required: boolean;
  placeholder?: string;
  selectedValue: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: ISelectProps) {
  return (
    <div>
      {props.label && <label htmlFor="price" className="block text-xs font-medium text-gray-700">
        {props.label} {props.required && <span className="text-red-500">*</span>}
      </label>}
      <div className="mt-1 relative">
        <select
          id={props.name}
          name={props.name}
          value={props.selectedValue}
          aria-label={props.name}
          className={`col-start-1 row-start-1 w-full appearance-none bg-white rounded-md py-1.5 pr-7 pl-3 text-base outline-gray-300 outline-1 text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${props.error && 'border-red-500'}`}
          onChange={props.handleChange}
        >
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {props.error && (
          <p className="text-red-500 text-sm">
            {props.error}
          </p>
        )}
        <FaAngleDown
          aria-hidden="true"
          className="absolute top-2.5 right-0 pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </div>
  )
}
