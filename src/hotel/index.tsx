import { Route, Routes } from "react-router"
import Landing from "./pages/Landing"

function HotelRoutes() {
  return (
    <div className="text-primary">
      <Routes>
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  )
}

export default HotelRoutes
