import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router";
import { fetchMemberDetail } from "../../app/actions/gym/member";
import { IMemberDetailPageProps } from "../pages/member/MemberDetailPage";
import { MemberDetail, MemberDetailWithMetadata } from "../../types/Member";
import { MembershipPlan } from "../../types/MembershipPlan";
import { getAllMembershipPlan } from "../../app/actions/gym/membershipPlans";

export default function BootstrapViewMemberDetail({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IMemberDetailPageProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);
  const params = useParams();
  
  const [memberDetail, setMemberDetail] = useState<MemberDetailWithMetadata | null>(null);
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  
  const fetchMembershipPlansData = async (companyId: string) => {
    const [err, data] = await dispatch(getAllMembershipPlan(companyId));
    if (err) {
      return;
    }
    setMembershipPlans(data || []);
  };

  const fetchData = async (memberDetailId: string) => {
    const [err, data] = await dispatch(fetchMemberDetail(memberDetailId));
    if (err) {
      return;
    }
    const updatedData = data.data as MemberDetail;
    updatedData.metadata = JSON.parse(updatedData.metadata);
    setMemberDetail(updatedData as unknown as MemberDetailWithMetadata);
  };

  useEffect(() => {
    if (selectedCompany) {
      fetchData(params.memberDetailId || '');
      fetchMembershipPlansData(selectedCompany.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  if (!memberDetail || !membershipPlans) return null;

  return <WrappedComponent memberDetail={memberDetail} membershipPlans={membershipPlans} />;
}
