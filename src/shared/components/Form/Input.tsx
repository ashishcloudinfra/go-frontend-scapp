interface IInputProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  value: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: IInputProps) {
  return (
    <div>
      <label htmlFor={props.name} className="block text-xs text-gray-700">
        {props.label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        <div className={`rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 ${props.error && 'outline-red-300'}`}>
          <input
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder || ''}
            className={`w-full block appearance-none py-1.5 pr-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
            onChange={props.handleChange}
          />
        </div>
        {props.error && (
          <p className="text-red-500 text-sm">
            {props.error}
          </p>
        )}
      </div>
    </div>
  )
}
