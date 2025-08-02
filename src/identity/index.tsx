import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import CompanyDetails from "./pages/CompanyDetails"

function IdentityRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/company-details" element={<CompanyDetails />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default IdentityRoute