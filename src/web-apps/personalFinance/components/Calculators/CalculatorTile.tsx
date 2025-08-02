import { FaLongArrowAltRight } from 'react-icons/fa'

interface ICalculatorTileProps {
  title: string;
  description: string;
  onClick: () => void;
}

export default function CalculatorTile(props: ICalculatorTileProps) {
  return (
    <div className="w-xs border border-gray-400 rounded-md p-4 scale-light cursor-pointer flex flex-col justify-between" onClick={props.onClick}>
      <div>
        <h2 className="text-md font-semibold text-gray-800">{props.title}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </div>
      <div className="flex justify-end"><FaLongArrowAltRight size={20} className="text-sky-600" /></div>
    </div>
  )
}
