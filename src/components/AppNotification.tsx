import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteNotificationData } from "../app/features/notification";
import { IoWarningOutline } from "react-icons/io5";

export default function AppNotification() {
  const { data: notificationData } = useAppSelector(s => s.notification);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(deleteNotificationData());
  }

  if (!notificationData) return null;

  return (
    <div className="fixed z-50 w-md right-4 top-4 rounded-md shadow-xl ">
      {notificationData.type === 'SUCCESS' && <div className=" py-4 px-6 flex justify-between bg-green-50 rounded-lg">
        <div className="flex gap-3">
          <FaRegCheckCircle className="text-green-500 relative top-0.5" size={22} />
          <div className="flex flex-col gap-1">
            <div className="">{notificationData.heading}</div>
            <div className="text-sm text-gray-500">{notificationData.description}</div>
          </div>
        </div>
        <span onClick={onClose}><RxCross2 /></span>
      </div>}
      {notificationData.type === 'ERROR' && <div className=" py-4 px-6 flex justify-between bg-rose-50 rounded-lg">
        <div className="flex gap-3">
          <RxCrossCircled className="text-red-500 relative top-0.5" size={22} />
          <div className="flex flex-col gap-1">
            <div className="">{notificationData.heading}</div>
            <div className="text-sm text-gray-500">{notificationData.description}</div>
          </div>
        </div>
        <span onClick={onClose}><RxCross2 /></span>
      </div>}
      {notificationData.type === 'WARNING' && <div className=" py-4 px-6 flex justify-between bg-yellow-50 rounded-lg">
        <div className="flex gap-3">
          <IoWarningOutline className="text-amber-500 relative top-0.5" size={22} />
          <div className="flex flex-col gap-1">
            <div className="">{notificationData.heading}</div>
            <div className="text-sm text-gray-500">{notificationData.description}</div>
          </div>
        </div>
        <span onClick={onClose}><RxCross2 /></span>
      </div>}
    </div>
  )
}