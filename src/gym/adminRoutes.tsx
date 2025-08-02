import { Route, Routes } from "react-router"
import AdminDashboard from './pages/AdminDashboard';
import BootstrapMemberManagement from "./BootstrapPages/BootstrapMemberManagement";
import EditMemberDetails from "./pages/member/EditMemberDetails";
import AdminSidenav from "./components/AdminSideNav";
import MemberManagement from "./pages/member/MemberManagement";
import MemberRegistration from "./pages/member/MemberRegistration";
import MemberDetailPage from "./pages/member/MemberDetailPage";
import ListMembershipPlans from "./pages/membershipPlans/List";
import AddMembershipPlan from "./pages/membershipPlans/Add";
import EditMembershipPlan from "./pages/membershipPlans/Edit";
import BootstrapEditMember from "./BootstrapPages/BootstrapEditMember";
import BootstrapMemberRegistration from "./BootstrapPages/BootstrapMemberRegistration";
import ManageStaff from "./pages/staff/List";
import AddStaff from "./pages/staff/Add";
import ListEventRoom from "./pages/eventRoom/List";
import AddEventRoom from "./pages/eventRoom/Add";
import BootstrapEventRoomList from "./BootstrapPages/BootstrapEventRoomList";
import BootstrapEditEventRoom from "./BootstrapPages/BootstrapEditEventRoom";
import EditEventRoom from "./pages/eventRoom/Edit";
import AddEvent from "./pages/event/Add";
import BootstrapAddEvent from "./BootstrapPages/event/BootstrapAddEvent";
import ManageEvent from "./pages/event/Manage";
import BootstrapStaffManagement from "./BootstrapPages/BootstrapStaffManagement";
import BootstrapEditStaffDetail from "./BootstrapPages/staff/BootstrapEditStaff";
import EditStaffDetail from "./pages/staff/Edit";
import BootstrapViewStaffDetail from "./BootstrapPages/BootstrapViewStaffDetail";
import ViewStaffDetails from "./pages/staff/View";
import BootstrapMembershipPlanList from "./BootstrapPages/BootstrapMembershipPlanList";
import BootstrapEditMembershipPlan from "./BootstrapPages/BootstrapEditMembershipPlan";
import BootstrapViewMemberDetail from "./BootstrapPages/BootstrapViewMemberDetail";
import BootstrapManageEvent from "./BootstrapPages/event/BootstrapManageEvent";
import InventoryManagement from "./pages/inventory/manage";
import AddNewEquipment from "./pages/inventory/AddNewEquipment";
import BootstrapUpdateItemQuantity from "./BootstrapPages/Inventory/BootstrapUpdateItemQuantity";
import BootstrapAddItem from "./BootstrapPages/Inventory/BootstrapAddItem";

function AdminRoutes() {
  return (
    <div className="bg-gray-50 text-primary">
      <AdminSidenav />
      <div className="flex min-h-screen bg-[url('/images/table-bg.png')] bg-center bg-cover">
        <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
          <Routes>
            <Route path="*" element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="member">
              <Route path="list" element={<BootstrapMemberManagement WrappedComponent={MemberManagement} />} />
              <Route path="add" element={<BootstrapMemberRegistration WrappedComponent={MemberRegistration} />} />
              <Route path="view/:memberDetailId" element={<BootstrapViewMemberDetail WrappedComponent={MemberDetailPage} />} />
              <Route path="edit/:memberDetailId" element={<BootstrapEditMember WrappedComponent={EditMemberDetails} />} />
            </Route>
            <Route path="membership-plan">
              <Route path="list" element={<BootstrapMembershipPlanList WrappedComponent={ListMembershipPlans} />} />
              <Route path="add" element={<AddMembershipPlan />} />
              <Route path="edit/:membershipPlanId" element={<BootstrapEditMembershipPlan WrappedComponent={EditMembershipPlan} />} />
            </Route>
            <Route path="staff">
              <Route path="list" element={<BootstrapStaffManagement WrappedComponent={ManageStaff} />} />
              <Route path="add" element={<AddStaff />} />
              <Route path="edit/:staffDetailId" element={<BootstrapEditStaffDetail WrappedComponent={EditStaffDetail} />} />
              <Route path="view/:staffDetailId" element={<BootstrapViewStaffDetail WrappedComponent={ViewStaffDetails} />} />
            </Route>
            <Route path="event">
              <Route path="list" element={<BootstrapManageEvent WrappedComponent={ManageEvent} />} />
              <Route path="add" element={<BootstrapAddEvent WrappedComponent={AddEvent} />} />
            </Route>
            <Route path="inventory">
              <Route path="list" element={<BootstrapUpdateItemQuantity WrappedComponent={InventoryManagement} />} />
              <Route path="add-item" element={<BootstrapAddItem WrappedComponent={AddNewEquipment} />} />
            </Route>
            <Route path="event-room">
              <Route path="list" element={<BootstrapEventRoomList WrappedComponent={ListEventRoom} />} />
              <Route path="add" element={<AddEventRoom />} />
              <Route path="edit/:eventRoomId" element={<BootstrapEditEventRoom WrappedComponent={EditEventRoom} />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminRoutes
