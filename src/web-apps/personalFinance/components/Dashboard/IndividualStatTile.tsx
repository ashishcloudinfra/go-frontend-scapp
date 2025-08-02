import { formatToIndianCurrency } from "../../../../helpers";

interface IIndividualStatTileProps {
  title: string;
  amount: number;
  icon?: React.ReactNode;
  color?: string;
  borderColor?: string;
  bgColor?: string;
}

export default function IndividualStatTile(props: IIndividualStatTileProps) {
  return (
    <div className="border-2 border-gray-300 w-[12rem] p-3 rounded-lg shadow flex gap-3" style={{
      backgroundColor: props.bgColor || 'white',
      borderColor: props.borderColor || '',
    }}>
      {props.icon && props.icon}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-gray-600">{props.title}</p>
        <h3>Rs. {formatToIndianCurrency(props.amount)}</h3>
      </div>
    </div>
  )
}
