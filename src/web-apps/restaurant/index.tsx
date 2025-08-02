import { Route, Routes } from "react-router"
import Landing from "./pages/Landing"
import AdminSidenav from "./components/AdminSideNav"
import MenuList from "./pages/Menu/List"
import AddMenuItem from "./pages/Menu/Add"
import BootstrapManageMenuItem from "./bootstrapPages/Menu/BootstrapManageMenu"
import Menu from "./pages/Customer/Menu"
import BootstrapMenuItem from "./bootstrapPages/Menu/Customer/BootstrapMenu"
import BootstrapOrder from "./bootstrapPages/Menu/Customer/BootstrapOrder"
import Order from "./pages/Customer/Order"
import FooterNav from "./components/Customer/FooterNav"
import BootstrapPay from "./bootstrapPages/Menu/Customer/BootstrapPay"
import Pay from "./pages/Customer/Pay"
import BootstrapOrderList from "./bootstrapPages/Menu/BootstrapOrderList"
import OrderList from "./pages/Orders/List"
import BootstrapEditMenuItem from "./bootstrapPages/Menu/BootstrapEditMenuItem"
import EditMenuItem from "./pages/Menu/Edit"
import ScanMenu from "./pages/Menu/Scan"

function RestaurantRoutes() {
  const isCustomer = window.location.href.includes('customer');
  return (
    <div className="text-primary">
      {!isCustomer && <AdminSidenav />}
      <div className="flex min-h-screen">
        <div className={isCustomer ? 'flex-1 p-4' : `flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out p-4 pt-10 md:p-4`}>
          <Routes>
            <Route path="*" element={<Landing />} />
            <Route path="admin">
              <Route path="menu">
                <Route path="list" element={<BootstrapManageMenuItem WrappedComponent={MenuList} />} />
                <Route path="scan" element={<ScanMenu />} />
                <Route path="add" element={<AddMenuItem />} />
                <Route path="edit/:menuItemId" element={<BootstrapEditMenuItem WrappedComponent={EditMenuItem} />} />
              </Route>
              <Route path="orders">
                <Route path="list" element={<BootstrapOrderList WrappedComponent={OrderList} />} />
              </Route>
            </Route>
            <Route path="customer">
              <Route path="menu/:companyId" element={<BootstrapMenuItem WrappedComponent={Menu} />} />
              <Route path="order/:companyId" element={<BootstrapOrder WrappedComponent={Order} />} />
              <Route path="pay/:companyId" element={<BootstrapPay WrappedComponent={Pay} />} />
            </Route>
          </Routes>
        </div>
      </div>
      {isCustomer && <FooterNav />}
    </div>
  )
}

export default RestaurantRoutes
