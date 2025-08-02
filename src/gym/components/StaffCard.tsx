import { MdLocalPhone } from "react-icons/md";
import { capitalizeFirstLetter, contactSeparator, fallbackImage } from "../../helpers";
import { StaffShortDetail } from "../../types/Staff";

interface IStaffCardProps {
  staff: StaffShortDetail;
  onStaffTileClick: () => void;
}

const StaffCard = (props: IStaffCardProps) => {
  const statusMap = {
    'authorized': {
      text: 'Authorized',
      color: 'text-green-800'
    },
    'review': {
      text: 'In review',
      color: 'text-yellow-600'
    },
    'deactivated': {
      text: 'Deactivated',
      color: 'text-red-800'
    }
  };

  return (
    <div className="w-64 p-6 bg-white rounded-lg shadow-lg border border-gray-200 relative flex flex-col justify-between">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
          src={fallbackImage(props.staff.gender)}
          alt={`${props.staff.gender}'s avatar`}
        />
      </div>

      {/* Staff Name and Status */}
      <div className="mt-5 text-center">
        <h3 className="text-xl font-semibold text-sky-700">
          {capitalizeFirstLetter(props.staff.firstName + ' ' + props.staff.lastName)}
        </h3>
        <h4 className={`text-sm font-semibold mt-1 ${statusMap[props.staff.status].color}`}>
          {statusMap[props.staff.status].text}
        </h4>
      </div>

      {/* Contact Information */}
      <div className="mt-5 text-center">
        <h3 className="text-sm text-gray-700 flex justify-center gap-2">
          <MdLocalPhone size={20} className="text-sky-600" />
          {contactSeparator(props.staff.phone)}
        </h3>
        <h4 className="text-xs mt-2 text-gray-500">{props.staff.email}</h4>
      </div>

      {/* View Details Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="w-full bg-indigo-400 text-white text-sm font-medium py-2.5 px-5 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-purple-200"
          onClick={props.onStaffTileClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StaffCard;
