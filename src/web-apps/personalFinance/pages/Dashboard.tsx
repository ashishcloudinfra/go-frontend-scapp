import PageHeading from "../../../components/PageHeading";
import { BudgetCategoryTypeStats } from "../../../types/PersonalFinance/Budget";
import CurrentMonthStat from "../components/Dashboard/CurrentMonthStat";
import YearStatsTiles from "../components/Dashboard/YearStatsTiles";
import MonthlyBudgetTrendLine from "../components/Dashboard/MonthlyBudgetTrendLine";
import { useNavigate } from "react-router";
import { AssetItem } from "../../../types/PersonalFinance/Asset";

export interface IDashboardProps {
  assets: AssetItem[];
  statsByMonthAndYear: BudgetCategoryTypeStats[];
}

export default function Dashboard(props: IDashboardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-0 md:p-2">
      <PageHeading
        title="Dashboard"
        description="One place to see everything"
        descriptionOnTop={true}
      />
      {!props.statsByMonthAndYear?.length && <div className="flex flex-col gap-4">
        <h3
          className="text-gray-500 text-4xl"
        >
          Get start by adding budgets and assets
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            className="bg-secondary text-gray-50 rounded-md px-3 py-2 scale-light cursor-pointer"
            onClick={() => navigate('/personalfinance/budget/manage')}
          >
            Set month budget
          </button>
          <button
            className="bg-secondary text-gray-50 rounded-md px-3 py-2 scale-light cursor-pointer"
            onClick={() => navigate('/personalfinance/asset/manage')}
          >
            Add assets
          </button>
        </div>
      </div>}
      {!!props.statsByMonthAndYear.length && <YearStatsTiles
        assets={props.assets}
        statsByMonthAndYear={props.statsByMonthAndYear}
      />}
      {!!props.statsByMonthAndYear.length && <div className="flex flex-col md:flex-row gap-4">
        <CurrentMonthStat
          statsByMonthAndYear={props.statsByMonthAndYear}
        />
        <MonthlyBudgetTrendLine
          statsByMonthAndYear={props.statsByMonthAndYear}
        />
      </div>}
    </div>
  )
}
