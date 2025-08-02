import { Routes, Route } from "react-router";
import GymRoutes from "./gym";
import IdentityRoute from "./identity";
import InvoiceRoutes from "./invoice";
import HotelRoutes from "./hotel";
import RestaurantRoutes from "./web-apps/restaurant";
import PersonalFinanceRoutes from "./web-apps/personalFinance";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/gym/*" element={<GymRoutes />} />
      <Route path="/invoice/*" element={<InvoiceRoutes />} />
      <Route path="/hotel/*" element={<HotelRoutes />} />
      <Route path="/restaurant/*" element={<RestaurantRoutes />} />
      <Route path="/personalfinance/*" element={<PersonalFinanceRoutes />} />
      <Route path="/*" element={<IdentityRoute />} />
    </Routes>
  )
}
