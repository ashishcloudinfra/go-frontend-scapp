import { useMemo, useState } from "react"
import useDebounce from "../../../hooks/useDebounce";

interface ISelectWithSearchProps {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: any) => void;
}

export default function SelectWithSearch(props: ISelectWithSearchProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<{
    value: string;
    label: string;
  }[]>([]);

  const [selectedOption, setSelectedOption] = useState(props.selectedValue || '');

  const optionsMap = useMemo(() => {
    const map: Record<string, string> = {};
    props.options.forEach((option) => {
      map[option.value] = option.label;
    });
    return map;
  }, [props.options]);

  useDebounce(
    () => {
      if (!searchTerm) {
        setFilteredOptions([]);
        return;
      }
      setFilteredOptions(
        props.options.filter((option) => {
          return option.label.toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    },
    [props.options, searchTerm],
    400
  );

  const handleSearch = (value: string) => setSearchTerm(value);

  return (
    <div className="w-full">
      <div className="relative group">
        <button
          id="dropdown-button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="mr-2 text-left">{optionsMap[selectedOption] || 'Select from options'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {isDropdownOpen && <ul id="dropdown-menu" className="absolute w-full max-h-[15rem] overflow-scroll right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-[1000]">
          <input
            id="search-input"
            className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder={props.placeholder}
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredOptions.map((option) => (
            <li
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              key={option.value}
              onClick={() => {
                setSelectedOption(option.value);
                setIsDropdownOpen(false);
                props.handleChange({ target: { name: props.name, value: option.value } })
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>}
      </div>
    </div>
  )
}
