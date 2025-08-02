import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMembershipPlanById } from "../../app/actions/gym/membershipPlans";
import { useParams } from "react-router";
import { MembershipPlan } from "../../types/MembershipPlan";
import { IMembershipPlanEditProps } from "../pages/membershipPlans/Edit";

export default function BootstrapEditMembershipPlan({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IMembershipPlanEditProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);
  const params = useParams();

  const [plan, setPlan] = useState<MembershipPlan | null>(null);

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(getMembershipPlanById(companyId, params.membershipPlanId || ''));
    if (err) {
      return;
    }
    setPlan(data || null);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  if (!plan) return null;

  return <WrappedComponent planDetail={plan} />;
}
