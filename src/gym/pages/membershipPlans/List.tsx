import { FaRegCalendarPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { deleteMembershipPlan } from "../../../app/actions/gym/membershipPlans";
import AdminMembershipPricingCard from "../../components/AdminMembershipPricingCard";
import { MembershipPlan } from "../../../types/MembershipPlan";
import PageHeading from "../../components/PageHeading";
import { resetModalData, setModalData } from "../../../app/features/modal";

export interface IListMembershipPlansProps {
  plans: MembershipPlan[];
}

export default function ListMembershipPlans(props: IListMembershipPlansProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onCloseDeleteDialog = () => {
    dispatch(resetModalData());
  }

  const onDialogConfirm = (selectedDialogId: string) => {
    dispatch(deleteMembershipPlan(selectedDialogId));
    onCloseDeleteDialog();
  }

  const onDeleteClickHandler = (id: string) => {
    dispatch(setModalData({
      isOpen: true,
      description: 'Are you sure you want to delete this membership plan?',
      btnActions: {
        onConfirm: onDialogConfirm.bind(null, id),
        onCancel: onCloseDeleteDialog,
      }
    }));
  }

  const onEditPlanHandler = (plan: MembershipPlan) => {
    navigate(`/gym/admin/membership-plan/edit/${plan.id}`);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <PageHeading
          title="Your membership plans"
          description="Manage your membership plans"
        />
        <Link
          to={'/gym/admin/membership-plan/add'}
          type="button"
          className="text-tertiary bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 hover:scale-105 transform transition duration-200 self-start"
        >
          <FaRegCalendarPlus className="mr-2" size={20} />
          Add plan
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-6">
        {props.plans.map((plan: MembershipPlan) => <AdminMembershipPricingCard
          key={plan.id}
          plan={plan}
          onDelete={onDeleteClickHandler}
          onEditPlan={onEditPlanHandler}
        />)}
      </div>
    </div>
  )
}
