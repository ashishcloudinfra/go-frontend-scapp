import { BsStars } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import { capitalizeFirstLetter } from "../../helpers";

export default function MemberDashboard() {
  const { data: userData } = useAppSelector(s => s.user);

  return (
    <div className="p-8 flex flex-col gap-10">
      <div>
        <div className="flex">
          <h1 className="text-2xl font-semibold">Welcome, {capitalizeFirstLetter(userData?.firstName || '')}</h1>
          <BsStars size={30} color="orange" />
        </div>
        <p className="text-sm text-gray-600">
          This is your main content. Resize the window to see the responsive
          behavior of the sidenav.
        </p>
      </div>
      <div className="dashboard-container">
        <div className="bg-cyan-900 text-gray-100 w-fit p-4 rounded-2xl shadow-md">
          <p className="text-3xl">20</p>
          <h2 className="text-lg">Active members</h2>
        </div>
      </div>
    </div>
  );
}
