import { Route, Routes } from "react-router"
import MemberDashboard from "./memberPages/Dashboard";
import MemberSideNav from "./components/member/MemberSideNav";
import ProfileView from "./memberPages/profile/View";
import EditProfile from "./memberPages/profile/Edit";

function MemberRoutes() {
  return (
    <div className="bg-gray-50 text-primary">
      <MemberSideNav />
      <div className="flex min-h-screen bg-[url('/images/table-bg.png')] bg-center bg-cover">
        <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
          <Routes>
            <Route path="dashboard" element={<MemberDashboard />} />
            <Route path="profile">
              <Route path="view" element={<ProfileView />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default MemberRoutes
