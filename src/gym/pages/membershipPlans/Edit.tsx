import { useAppDispatch } from "../../../app/hooks";
import { editMembershipPlan } from "../../../app/actions/gym/membershipPlans";
import { useNavigate } from "react-router";
import MembershipPlanForm from "../../components/MembershipPlanForm";
import PageHeading from "../../components/PageHeading";
import { MembershipPlan } from "../../../types/MembershipPlan";

export interface MembershipPlanFormValues {
  name: string;
  duration: string;
  features: string[];
  cancellation_policy: string[];
  price: number;
  discount: string;
  status: string;
}

export interface IMembershipPlanEditProps {
  planDetail: MembershipPlan;
}

export default function EditMembershipPlan(props: IMembershipPlanEditProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (formValues: MembershipPlanFormValues) => {
    await dispatch(editMembershipPlan(props.planDetail.id, formValues));
    navigate('/gym/admin/membership-plan/list');
  }

  return (
    <div className="p-8">
      <PageHeading
        title="Edit membership plan"
        description="Edit your membership plan details"
      />
      <MembershipPlanForm formValues={props.planDetail as unknown as MembershipPlanFormValues} onFormSubmit={onHandleSubmit} />
    </div>
  );
}
