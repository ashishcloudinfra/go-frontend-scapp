import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { BudgetCategoryTypeStats } from "../../../types/PersonalFinance/Budget";
import { getBudgetStatsByMonthAndYear } from "../../../app/actions/personalFinance/budget";
import { IDashboardProps } from "../pages/Dashboard";
import { getAllAssets } from "../../../app/actions/personalFinance/asset";
import { AssetItem } from "../../../types/PersonalFinance/Asset";

export default function BootstrapDashboard({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IDashboardProps> }) {
  const dispatch = useAppDispatch();
  const tokenData = useAppSelector(s => s.token.data);

  const [statsByMonthAndYear, setStatsByMonthAndYear] = useState<BudgetCategoryTypeStats[]>([]);
  const [assets, setAssets] = useState<AssetItem[]>([]);

  const fetchBudgetStats = async () => {
    const [err, data] = await dispatch(getBudgetStatsByMonthAndYear());
    if (err) {
      return;
    }
    setStatsByMonthAndYear(data || []);
  };

  const fetchAllAssets = async () => {
    const [err, data] = await dispatch(getAllAssets());
    if (err) {
      return;
    }
    setAssets(data || []);
  };

  const fetchAllData = async () => {
    fetchBudgetStats();
    fetchAllAssets();
  }

  useEffect(() => {
    if (!tokenData) {
      return;
    }
    fetchAllData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData]);

  return <WrappedComponent
    assets={assets}
    statsByMonthAndYear={statsByMonthAndYear}
  />;
}
