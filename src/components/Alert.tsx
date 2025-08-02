import { FaInfoCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { MdError } from "react-icons/md";

interface IAlertProps {
  type: 'INFO' | 'ERROR' | 'WARNING';
  message: string;
}

export default function Alert(props: IAlertProps) {
  return (
    <div>
      {props.type === 'WARNING' && <div className="flex gap-2 bg-yellow-50 border border-yellow-300 text-gray-700 px-4 py-3 rounded relative" role="alert">
        <IoWarning size={20} />
        <span className="block sm:inline">{props.message}</span>
      </div>}
      {props.type === 'INFO' && <div className="flex gap-2 bg-sky-50 border border-sky-300 text-gray-700 px-4 py-3 rounded relative" role="alert">
        <FaInfoCircle size={20} />
        <span className="block sm:inline">{props.message}</span>
      </div>}
      {props.type === 'ERROR' && <div className="flex gap-2 bg-red-50 border border-red-300 text-gray-700 px-4 py-3 rounded relative" role="alert">
        <MdError size={20} />
        <span className="block sm:inline">{props.message}</span>
      </div>}
    </div>
  )
}
