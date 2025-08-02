import { Link, useNavigate } from "react-router";
import PageHeading from "../../components/PageHeading";
import { IoPersonAddSharp } from "react-icons/io5";
import { StaffShortDetail } from "../../../types/Staff";
import StaffCard from "../../components/StaffCard";

export interface IManageStaff {
  staffs: StaffShortDetail[];
}

export default function ManageStaff(props: IManageStaff) {
  const navigate = useNavigate();

  const onStaffTileClick = (staff: StaffShortDetail) => {
    navigate(`/gym/admin/staff/view/${staff.iamId}`);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <PageHeading
          title="Manage staff"
          description="Manage your staff"
        />
        <Link
          to={'/gym/admin/staff/add'}
          type="button"
          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
        >
          <IoPersonAddSharp className="mr-2" size={20} />
          Add staff
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {props.staffs.map((staff: StaffShortDetail) => <StaffCard
          key={staff.id}
          staff={staff}
          onStaffTileClick={() => onStaffTileClick(staff)}
        />)}
      </div>
    </div>
  )
}
