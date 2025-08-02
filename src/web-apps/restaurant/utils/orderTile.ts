import { OrderStatus } from "../../../types/Orders"

export const getOrderTileForwardBtnData = (orderStatus: keyof typeof OrderStatus) => {
  if (orderStatus === 'New') return {
    class: 'bg-sky-600 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'Accept',
  };
  if (orderStatus === 'Accepted') return {
    class: 'bg-sky-600 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'To preparing',
  };
  if (orderStatus === 'Preparing') return {
    class: 'bg-sky-600 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'To complete',
  };
  if (orderStatus === 'Completed') return {
    class: 'bg-green-500 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'Mark as paid',
  };
  return {
    class: '',
    text: 'Next',
  };
}
export const getOrderTileBackwardBtnData = (orderStatus: keyof typeof OrderStatus) => {
  if (orderStatus === 'New') return {
    class: 'bg-red-500 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'Mark as out of stock',
  };
  if (orderStatus === 'Accepted') return {
    class: 'bg-sky-600 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'Back to new',
  };
  if (orderStatus === 'Preparing') return {
    class: 'bg-sky-600 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'Back to accepted',
  };

  if (orderStatus === 'Completed') return {
    class: 'bg-sky-600 text-white rounded px-1.5 py-0.5 shadow-md scale-light cursor-pointer',
    text: 'Back to preparing',
  };
  return {
    class: '',
    text: 'Previous',
  };
}
