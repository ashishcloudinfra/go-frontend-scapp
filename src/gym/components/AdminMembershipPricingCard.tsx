import { BsTrash3Fill } from "react-icons/bs";
import { MembershipPlan } from "../../types/MembershipPlan";
import { MdEdit } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // For green/red icons

interface IAdminMembershipPricingCardProps {
  plan: MembershipPlan;
  onDelete: (id: string) => void;
  onEditPlan: (plan: MembershipPlan) => void;
}

const durationMap = {
  'monthly': 'Month',
  'quarterly': 'Quarter',
  'annually': 'Year',
};

const AdminMembershipPricingCard = (props: IAdminMembershipPricingCardProps) => {
  const onPlanDeleteClickHandler = () => {
    props.onDelete(props.plan.id);
  };

  return (
    <div className="w-[15rem] rounded-lg shadow-lg scale-light">
      {/* Top section with plan name, price, and duration */}
      <div className="p-4 bg-indigo-400 text-white rounded-t-lg">
        {/* Plan Name */}
        <h3 className="text-mb font-semibold text-center">{props.plan.name}</h3>
        {/* Price */}
        <p className="text-xl font-semibold my-2 text-center">₹ {props.plan.price}</p>
        {/* Duration */}
        <p className="text-xs opacity-80 text-center">/ {durationMap[props.plan.duration]}</p>
      </div>

      {/* Main content wrapper with consistent spacing */}
      <div className="p-3 flex flex-col gap-4">
        {/* Status Section */}
        <div className="flex justify-center items-center gap-2">
          {/* Green/Red Icon */}
          {props.plan.status === 'inactive' ? (
            <AiOutlineCloseCircle size={20} className="text-red-600" />
          ) : (
            <AiOutlineCheckCircle size={20} className="text-green-600" />
          )}
          {/* Status Text */}
          <span className="text-gray-600 text-mb font-semibold">
            {props.plan.status === 'inactive' ? 'Inactive' : 'Active'}
          </span>
        </div>

        {/* Line separator below status */}
        <hr className="border-gray-300 mx-8" />

        {/* Features List */}
        <div className="space-y-3 text-sm text-gray-700">
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔</span>
              <span>2 auto tracking</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔</span>
              <span>7 Day transaction clearing</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔</span>
              <span>24/7 Customer support</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔</span>
              <span>All widget access</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => props.onEditPlan(props.plan)}
            className="flex items-center text-indigo-600 bg-white border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 font-medium rounded-lg text-sm px-5 py-2.5 transition-all ease-in-out duration-300"
          >
            <MdEdit size={10} className="mr-2" />
            Edit
          </button>
          <button
            onClick={onPlanDeleteClickHandler}
            className="flex items-center text-red-600 bg-white border border-red-300 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 transition-all ease-in-out duration-300"
          >
            <BsTrash3Fill size={10} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMembershipPricingCard;
