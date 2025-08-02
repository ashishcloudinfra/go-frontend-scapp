import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MembershipPlan } from "../../types/MembershipPlan";
import { getAllMembershipPlan } from "../../app/actions/gym/membershipPlans";
import { IListMembershipPlansProps } from "../pages/membershipPlans/List";

export default function BootstrapMembershipPlanList({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IListMembershipPlansProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);

  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(getAllMembershipPlan(companyId));
    if (err) {
      return;
    }
    setMembershipPlans(data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent plans={membershipPlans} />;
}
