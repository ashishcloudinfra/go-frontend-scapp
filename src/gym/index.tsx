import { Routes, Route } from "react-router";
import AdminRoutes from "./adminRoutes";
import MemberRoutes from "./memberRoutes";
import MemberRegistration from "./pages/memberRegistration/MemberRegistration";
import BootstrapNewMemberRegistration from "./BootstrapPages/memberRegistration/BootstrapNewMemberRegistration";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/member/*" element={<MemberRoutes />} />
      <Route path="/memberRegistration/:companyId" element={<BootstrapNewMemberRegistration WrappedComponent={MemberRegistration} />} />
    </Routes>
  )
}