import { useState } from "react";
import { MdEdit } from "react-icons/md";

interface IEditColumnProps {
  value: string | number;
  isEditable?: boolean;
  onChange: (val: string | number) => void;
}

export default function EditColumn(props: IEditColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  return (
    <div className="">
      {!isEditing && <div className="flex gap-4">
        <span>{props.value}</span>
        {props.isEditable && <MdEdit
          size={14}
          className="text-sky-600 relative top-1 cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
        />}
      </div>}
      {isEditing && <div className="flex gap-2">
        <input
          type="number"
          className="outline-1 outline-gray-200 p-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-sky-600 text-gray-50 p-2 rounded-sm cursor-pointer"
          onClick={() => {
            props.onChange(value);
            setIsEditing(false);
          }}
        >
          Ok
        </button>
      </div>}
    </div>
  )
}
