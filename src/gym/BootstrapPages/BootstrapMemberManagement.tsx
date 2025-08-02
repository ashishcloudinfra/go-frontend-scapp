import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MemberShortDetail } from "../../types/Member";
import { IMemberManagementProps } from "../pages/member/MemberManagement";
import { fetchAllUsersByCompanyIdAndRole } from "../../app/actions/gym/member";

export default function BootstrapMemberManagement({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IMemberManagementProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);

  const [members, setMembers] = useState<MemberShortDetail[]>([]);

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(fetchAllUsersByCompanyIdAndRole(companyId, 'member'));
    if (err) {
      return;
    }
    setMembers(data.data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent members={members} />;
}
