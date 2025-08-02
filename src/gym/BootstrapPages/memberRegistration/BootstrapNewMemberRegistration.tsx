import { useEffect, useState } from "react";
import { MembershipPlan } from "../../../types/MembershipPlan";
import { getAllMembershipPlan } from "../../../app/actions/gym/membershipPlans";
import { useAppDispatch } from "../../../app/hooks";
import { INewMemberRegistrationProps } from "../../pages/memberRegistration/MemberRegistration";
import { useParams } from "react-router";

export default function BootstrapNewMemberRegistration({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<INewMemberRegistrationProps> }) {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);

  const fetchMembershipPlansData = async (companyId: string) => {
    const [err, data] = await dispatch(getAllMembershipPlan(companyId));
    if (err) {
      return;
    }
    setMembershipPlans(data || []);
  };

  useEffect(() => {
    fetchMembershipPlansData(params.companyId || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WrappedComponent companyId={params.companyId || ''} membershipPlans={membershipPlans} />;
}
