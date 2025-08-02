import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MembershipPlan } from "../../types/MembershipPlan";
import { getAllMembershipPlan } from "../../app/actions/gym/membershipPlans";
import { IMemberRegistrationProps } from "../pages/member/MemberRegistration";

export default function BootstrapMemberRegistration({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IMemberRegistrationProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);

  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);

  const fetchMembershipPlansData = async (companyId: string) => {
    const [err, data] = await dispatch(getAllMembershipPlan(companyId));
    if (err) {
      return;
    }
    setMembershipPlans(data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchMembershipPlansData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent membershipPlans={membershipPlans} />;
}
