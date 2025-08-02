import { Route, Routes } from "react-router"
import PageLoader from "./shared/components/PageLoader";
import BootstrapApp from "./bootstrapPages/BootstrapApp";
import AppRoutes from "./routes";
import AppModal from "./components/AppModal";
import AppToast from "./components/AppToast";
import IdentityRoute from "./identity";
import AppNotification from "./components/AppNotification";

function App() {
  return (
    <div className="min-h-screen bg-[url('/images/table-bg.png')] bg-center bg-cover">
      <PageLoader />
      <AppModal />
      <AppToast />
      <AppNotification />
      <Routes>
        <Route path="/*" element={<BootstrapApp WrappedComponent={AppRoutes} />} />
        <Route path="/auth/*" element={<IdentityRoute />} />
      </Routes>
    </div>
  )
}

export default App
