import { useMemo } from "react";
import { BsBarChartFill, BsFillPiggyBankFill } from "react-icons/bs";
import { FaMoneyBillWave, FaSlideshare } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { BudgetCategoryTypeStats } from "../../../../types/PersonalFinance/Budget";
import IndividualStatTile from "./IndividualStatTile";
import { AssetItem } from "../../../../types/PersonalFinance/Asset";
import { calculateTotalNetworth } from "../../helpers/asset";
import { TbMoodDollar } from "react-icons/tb";

interface IYearStatsTilesProps {
  assets: AssetItem[];
  statsByMonthAndYear: BudgetCategoryTypeStats[];
}

export default function YearStatsTiles(props: IYearStatsTilesProps) {
  const totalNetworth = useMemo(() => calculateTotalNetworth(props.assets), [props.assets]);

  const currentYearStats = useMemo(() => {
    return props.statsByMonthAndYear.filter((stat) => {
      const date = new Date();
      return stat.year === date.getFullYear()
    })
  }, [props.statsByMonthAndYear]);

  return (
    <div className="flex flex-wrap gap-3">
      <IndividualStatTile
        title="Total networth"
        amount={Math.round(totalNetworth)}
        icon={<TbMoodDollar className="text-purple-600 relative top-1" size={30} />}
        bgColor="#f5f3ff"
      />
      <IndividualStatTile
        title="Income this year"
        amount={currentYearStats.filter(v => v.category_type === 'Income').reduce((memo, curr) => memo + curr.total_actual_amount, 0)}
        icon={<FaMoneyBillWave className="text-green-600 relative top-1" size={30} />}
        bgColor="#ecfdf5"
      />
      <IndividualStatTile
        title="Savings this year"
        amount={currentYearStats.filter(v => v.category_type === 'Saving').reduce((memo, curr) => memo + curr.total_actual_amount, 0)}
        icon={<BsFillPiggyBankFill className="text-amber-600 relative top-1" size={30} />}
      />
      <IndividualStatTile
        title="Investments this year"
        amount={currentYearStats.filter(v => v.category_type === 'Investment').reduce((memo, curr) => memo + curr.total_actual_amount, 0)}
        icon={<BsBarChartFill className="text-sky-600 relative top-1" size={30} />}
      />
      <IndividualStatTile
        title="Expense this year"
        amount={currentYearStats.filter(v => v.category_type === 'Expense').reduce((memo, curr) => memo + curr.total_actual_amount, 0)}
        icon={<GiExpense className="text-red-600 relative top-1" size={30} />}
      />
      <IndividualStatTile
        title="Other Expense this year"
        amount={currentYearStats.filter(v => v.category_type === 'Other').reduce((memo, curr) => memo + curr.total_actual_amount, 0)}
        icon={<FaSlideshare className="text-red-600 relative top-1" size={30} />}
      />
    </div>
  )
}
