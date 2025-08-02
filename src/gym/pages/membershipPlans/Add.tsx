import { useAppDispatch } from "../../../app/hooks";
import { addMembershipPlan } from "../../../app/actions/gym/membershipPlans";
import { useNavigate } from "react-router";
import MembershipPlanForm from "../../components/MembershipPlanForm";
import PageHeading from "../../components/PageHeading";

export interface MembershipPlanFormValues {
  name: string;
  duration: string;
  features: string[];
  cancellation_policy: string[];
  price: number;
  discount: string;
  status: string;
}

export default function AddMembershipPlan() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (formValues: MembershipPlanFormValues) => {
    await dispatch(addMembershipPlan(formValues));
    navigate('/gym/admin/membership-plan/list');
  }

  return (
    <div className="p-8">
      <PageHeading
        title="Add membership plan"
        description="Add your membership plan details"
      />
      <MembershipPlanForm onFormSubmit={onHandleSubmit} />
    </div>
  );
}
