import { Route, Routes } from "react-router"
import InvoiceForm from "./pages/InvoiceForm"


function InvoiceRoutes() {
  return (
    <div className="text-primary">
      <Routes>
        <Route path="*" element={<InvoiceForm />} />
      </Routes>
    </div>
  )
}

export default InvoiceRoutes