import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import SideNav from "./components/SideNav";
import Manage from "./pages/budget/Manage";
import BootstrapManageBudget from "./BootstrapPages/BootstrapManageBudget";
import CalculatorsPage from "./pages/calculators";
import AdvanceAssetLoanCalculator from "./pages/calculators/AdvanceAssetLoanCalculator";
import FIRECalculator from "./pages/calculators/FIRECalculator";
import AssetLoanCalculator from "./pages/calculators/AssetLoanCalculator";
import BootstrapDashboard from "./BootstrapPages/BootstrapDashboard";
import ManageAssets from "./pages/assets/Manage";
import Prompt from "./components/Prompt";
import BootstrapManageAsset from "./BootstrapPages/BootstrapManageAsset";
import Cash from "./pages/assets/Cash";
import Gold from "./pages/assets/Gold";
import Silver from "./pages/assets/Silver";
import MutualFund from "./pages/assets/MutualFund";
import BootstrapMutualFund from "./BootstrapPages/Asset/BootstrapMutualFund";
import BootstrapStock from "./BootstrapPages/Asset/BootstrapStock";
import Stock from "./pages/assets/Stock";
import BootstrapETF from "./BootstrapPages/Asset/BootstrapETF";
import ETF from "./pages/assets/ETF";
import RealEstate from "./pages/assets/RealEstate";
import FixedDeposit from "./pages/assets/FixedDeposit";
import EPF from "./pages/assets/EPF";
import NPS from "./pages/assets/NPS";
import PricingPlanPage from "./pages/pricing/Plans";
import SWPCalculator from "./pages/calculators/SWPCalculator";
import SipCalculator from "./pages/calculators/SipCalculator"

export default function PersonalFinanceRoutes() {
  return (
    <div className="text-primary">
      <SideNav />
      <Prompt />
      <div className="flex min-h-screen">
        <div className='flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out p-4 pt-10 md:p-4'>
          <Routes>
            <Route path="/dashboard" element={<BootstrapDashboard WrappedComponent={Dashboard} />} />
            <Route path="/budget">
              <Route path="manage" element={<BootstrapManageBudget WrappedComponent={Manage} />} />
            </Route>
            <Route path="/pricing">
              <Route path="plans" element={<PricingPlanPage />} />
            </Route>
            <Route path="/asset">
              <Route path="manage" element={<BootstrapManageAsset WrappedComponent={ManageAssets} />} />
              <Route path="cash" element={<BootstrapManageAsset WrappedComponent={Cash} />} />
              <Route path="gold" element={<BootstrapManageAsset WrappedComponent={Gold} />} />
              <Route path="silver" element={<BootstrapManageAsset WrappedComponent={Silver} />} />
              <Route path="mutual fund" element={<BootstrapMutualFund WrappedComponent={MutualFund} />} />
              <Route path="stock" element={<BootstrapStock WrappedComponent={Stock} />} />
              <Route path="etf" element={<BootstrapETF WrappedComponent={ETF} />} />
              <Route path="realestate" element={<BootstrapManageAsset WrappedComponent={RealEstate} />} />
              <Route path="fixeddeposit" element={<BootstrapManageAsset WrappedComponent={FixedDeposit} />} />
              <Route path="epf" element={<BootstrapManageAsset WrappedComponent={EPF} />} />
              <Route path="nps" element={<BootstrapManageAsset WrappedComponent={NPS} />} />
            </Route>
            <Route path="/calculators">
              <Route path="home" element={<CalculatorsPage />} />
              <Route path="advance-asset-loan-calculator" element={<AdvanceAssetLoanCalculator />} />
              <Route path="asset-loan-calculator" element={<AssetLoanCalculator />} />
              <Route path="fire-calculator" element={<FIRECalculator />} />
              <Route path="swp-calculator" element={<SWPCalculator />} />
              <Route path="sip-calculator" element={<SipCalculator />} />
            </Route>
            <Route path="*" element={<BootstrapDashboard WrappedComponent={Dashboard} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
