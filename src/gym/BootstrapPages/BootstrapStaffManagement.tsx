import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IManageStaff } from "../pages/staff/List";
import { StaffShortDetail } from "../../types/Staff";
import { fetchAllStaff } from "../../app/actions/gym/staff";

export default function BootstrapStaffManagement({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IManageStaff> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);

  const [staffs, setStaffs] = useState<StaffShortDetail[]>([]);

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(fetchAllStaff(companyId, 'staff'));
    if (err) {
      return;
    }
    setStaffs(data.data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent staffs={staffs} />;
}
