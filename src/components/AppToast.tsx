import { deleteToastData } from "../app/features/toast";
import { useAppDispatch, useAppSelector } from "../app/hooks"

export default function AppToast() {
  const { data: toastData } = useAppSelector(s => s.toast);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(deleteToastData());
  }

  if (!toastData) return null;

  return (
    <div className="fixed w-screen z-50 bottom-0">
      {toastData.type === 'SUCCESS' && <div className="bg-emerald-600 text-gray-200 py-2 px-4 flex justify-between">
        <span>{toastData.text}</span>
        <span onClick={onClose}>X</span>
      </div>}
      {toastData.type === 'ERROR' && <div className="bg-red-600 text-gray-200 py-2 px-4 flex justify-between">
        <span>{toastData.text}</span>
        <span onClick={onClose}>X</span>
      </div>}
      {toastData.type === 'WARNING' && <div className="bg-amber-600 text-gray-700 py-2 px-4 flex justify-between">
        <span>{toastData.text}</span>
        <span onClick={onClose}>X</span>
      </div>}
    </div>
  )
}
