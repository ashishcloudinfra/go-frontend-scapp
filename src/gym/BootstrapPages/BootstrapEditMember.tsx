import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MembershipPlan } from "../../types/MembershipPlan";
import { getAllMembershipPlan } from "../../app/actions/gym/membershipPlans";
import { IEditMemberDetailsProps } from "../pages/member/EditMemberDetails";
import { useParams } from "react-router";
import { fetchMemberDetail } from "../../app/actions/gym/member";
import { MemberDetail, MemberDetailWithMetadata } from "../../types/Member";

export default function BootstrapEditMember({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IEditMemberDetailsProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);
  const params = useParams();
  
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [memberDetail, setMemberDetail] = useState<MemberDetailWithMetadata | null>(null);

  const fetchData = async (memberDetailId: string) => {
    const [err, data] = await dispatch(fetchMemberDetail(memberDetailId));
    if (err) {
      return;
    }
    const updatedData = data.data as MemberDetail;
    updatedData.metadata = JSON.parse(updatedData.metadata);
    setMemberDetail(updatedData as unknown as MemberDetailWithMetadata);
  };

  const fetchMembershipPlansData = async (companyId: string) => {
    const [err, data] = await dispatch(getAllMembershipPlan(companyId));
    if (err) {
      return;
    }
    setMembershipPlans(data || []);
  };

  useEffect(() => {
    if (selectedCompany) {
      fetchMembershipPlansData(selectedCompany.id);
      fetchData(params.memberDetailId || '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  if (!memberDetail) return null;

  return <WrappedComponent memberDetail={memberDetail} membershipPlans={membershipPlans} />;
}
