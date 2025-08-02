import { useMemo, useState } from "react";
import { BudgetCategoryTypeStats, CategoryType } from "../../../../types/PersonalFinance/Budget";
import { Line } from "react-chartjs-2";
import Select from "../../../../shared/components/Form/Select";
import { CategoryTypeLineBgColor } from "../../constants";

interface IMonthlyBudgetTrendLineProps {
  statsByMonthAndYear: BudgetCategoryTypeStats[];
}

export default function MonthlyBudgetTrendLine(props: IMonthlyBudgetTrendLineProps) {
  const [selectedValue, setSelectedValue] = useState<CategoryType>('Income');

  const mapByCategoryType = useMemo(() => {
    return props.statsByMonthAndYear.reduce((memo, curr) => {
      if (!memo[curr.category_type]) {
        memo[curr.category_type] = []
      }
      memo[curr.category_type].push(curr)
      return memo
    }, {} as Record<string, BudgetCategoryTypeStats[]>)
  }, [props.statsByMonthAndYear]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value as CategoryType);
  }

  return (
    <div className="w-[25rem] lg:w-[30rem] bg-gray-50 border-2 border-gray-300 rounded-xl p-4 shadow-xl flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-gray-600">Trends in this year budget</p>
        <div className="w-[8rem]">
          <Select
            name='budgetCategoryType'
            selectedValue={selectedValue}
            required={false}
            options={Object.keys(mapByCategoryType).map(v => ({ label: v, value: v }))}
            handleChange={onChangeHandler}
          />
        </div>
      </div>
      <div className="w-full h-full p-4">
        <Line 
          data={{
            labels: Array.from({ length: 12 }, (_, i) => i + 1),
            datasets: [{
              label: selectedValue,
              data: mapByCategoryType[selectedValue]?.sort((a, b) => {
                if (a.month < b.month) return -1;
                else if (a.month > b.month) return 1;
                return 0;
              }).map((v) => v.total_actual_amount) || [],
              borderColor: mapByCategoryType[selectedValue]?.[0].bg_color,
              backgroundColor: CategoryTypeLineBgColor[selectedValue] || '',
              tension: 0.3,
              fill: true,
            }]
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  )
}
