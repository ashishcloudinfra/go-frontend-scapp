import { Doughnut } from "react-chartjs-2";
import { formatToIndianCurrency } from "../../../../helpers";
import { BudgetCategoryTypeStats } from "../../../../types/PersonalFinance/Budget";
import { useMemo } from "react";

interface ICurrentMonthStatProps {
  statsByMonthAndYear: BudgetCategoryTypeStats[];
}

export default function CurrentMonthStat(props: ICurrentMonthStatProps) {
  const currentMonthYearBudget = useMemo(() => {
    return props.statsByMonthAndYear.filter((stat) => {
      const date = new Date();
      return stat.month === date.getMonth() && stat.year === date.getFullYear()
    })
  }, [props.statsByMonthAndYear])

  return (
    <div className="border-2 border-gray-300 rounded-xl p-6 shadow-xl flex flex-col md:flex-row gap-4 bg-gray-50">
      <div className="self-center w-[15rem]">
        <Doughnut
          data={{
            labels: currentMonthYearBudget.map((stat) => stat.category_type),
            datasets: [{
              data: currentMonthYearBudget.map((stat) => stat.total_actual_amount),
              backgroundColor: currentMonthYearBudget.map((stat) => stat.bg_color),
              hoverOffset: 4,
            }],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-3 text-gray-700">
        <p className="text-wrap">Current month budget stats</p>
        <ul className="flex flex-row md:flex-col flex-wrap gap-2">
          {currentMonthYearBudget.map(v => <li key={`${v.month}-${v.year}-${v.category_type}`} className="flex gap-2">
            <span className="w-4 h-4 relative top-1 rounded-sm" style={{
              backgroundColor: v.bg_color,
            }}></span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">{v.category_type}</span>
              <span className="text-sm text-gray-600">Rs. {formatToIndianCurrency(v.total_actual_amount)}</span>
            </div>
          </li>)}
        </ul>
      </div>
    </div>
  )
}
