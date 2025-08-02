import React from "react";

interface InputProps {
  label: string;
  name: string;
  id: string;
  value: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholderText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenericInput: React.FC<InputProps> = ({
  label,
  name,
  id,
  value,
  type = "text",
  required = false,
  error = "",
  placeholderText,
  onChange,
}) => {
  return (
    <div className="mb-4 grid xs:grid-col-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      <label
        htmlFor={id}
        className="block mb-2 text-md font-medium text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="col-span-2">
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholderText}
          onChange={onChange}
          className={`bg-gray-200 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default GenericInput;
