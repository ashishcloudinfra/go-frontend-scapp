import { useState } from "react";
import { GiDiamonds } from "react-icons/gi";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { createPaymentOrder } from "../../../../app/actions/paymentGateway/order";
import { editMember } from "../../../../app/actions/gym/member";
import { fetchUserDetails } from "../../../../app/actions/user";

export default function PricingPlanPage() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(s => s.user.data);
  const { error, isLoading, Razorpay } = useRazorpay();

  const [isChecked, setIsChecked] = useState(true);

  const handlePayment = async (selectedPlan: string) => {
    if (!userData) return;

    let value = 0;
    if (selectedPlan === 'Pro') {
      if (isChecked) value = 19*12;
      else value = 29;
    } else if (selectedPlan === 'ProPlus') {
      if (isChecked) value = 39*12;
      else value = 49;
    }
    const [err, orderId] = await dispatch(createPaymentOrder({
      amount: value*100,
      currency: 'INR',
      receipt: `${selectedPlan}${(new Date()).getTime()}`,
    }));
    if (err) {
      console.log('Error creating order');
      return;
    }
    const options: RazorpayOrderOptions = {
      key: "rzp_test_l8vK0K1qFej4Mw",
      amount: value,
      currency: "INR",
      name: "SimplifyControl",
      description: "Test Transaction",
      order_id: orderId,
      handler: async (response) => {
        await dispatch(editMember(userData.iamId, {
          ...userData,
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zip: userData.zip || '',
          country: userData.country || '',
          dob: userData.dob || '',
          metadata: userData.metadata || '',
          role: "",
          permissions: "",
          plans: JSON.stringify({
            ...response,
            planName: selectedPlan,
            price: value,
            billedAnnually: isChecked,
          }),
          status: "authorized"
        }));
        dispatch(fetchUserDetails());
      },
      prefill: {
        name: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        contact: userData.phone,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  console.log(error, isLoading)

  return (
    <div className="p-8 flex flex-col gap-2">
      <h2 className="text-2xl text-gray-800 text-center font-semibold">Friendly Pricing</h2>
      <p className="text-sm text-gray-600 text-center">Attractive pricing according to your use case</p>

      <div className="text-center mt-10">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">{isChecked ? 'Annual': 'Monthly'}</span>
        </label>
      </div>

      <div className="flex justify-center flex-wrap gap-3 my-5">
        <div className="border-1 border-gray-400 p-4 rounded-xl w-xs">
          <div className="flex gap-1">
            <h3 className="text-sm bg-gray-500 text-gray-50 w-fit px-1 rounded-sm">Free</h3>
            {!userData?.plans && <span className="text-sm bg-green-700 text-gray-50 w-fit px-2 rounded-full">Selected</span>}
          </div>
          <p className="text-xs text-gray-600 mt-1">Essential tools for individuals</p>

          <p className="text-3xl my-5">Rs. 0</p>

          <p className="text-xs text-gray-600">What's included?</p>
          <ul className="text-sm flex flex-col gap-1 mt-2">
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Financial Calculators</li>
            <li className="text-gray-400 flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Budgeting tools(First 3 months free)</li>
            <li className="text-gray-400 flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Asset management(First 3 months free)</li>
            <li className="text-gray-400 flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> AI analysis</li>
          </ul>
        </div>

        <div className="border-1 border-gray-400 p-4 rounded-xl w-xs">
          <div className="flex gap-1">
            <h3 className="text-sm bg-secondary text-gray-50 w-fit px-1 rounded-sm">Pro</h3>
            {userData?.plans && JSON.parse(userData?.plans).planName === "Pro" && <span className="text-sm bg-green-700 text-gray-50 w-fit px-2 rounded-full">Selected</span>}
          </div>

          <p className="text-xs text-gray-600 mt-1">Essential tools for budget tracking</p>

          <p className="text-3xl my-5">Rs. {isChecked ? '19': '29'}<span className="text-sm ml-1 text-gray-500">monthly</span></p>

          <p className="text-xs text-gray-600">What's included?</p>
          <ul className="text-sm flex flex-col gap-1 mt-2">
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Financial Calculators</li>
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Budgeting tools</li>
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Asset management</li>
            <li className="text-gray-400 flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> AI analysis</li>
          </ul>

          <button
            className="w-full bg-secondary text-gray-50 rounded-md text-sm py-2 mt-5 scale-light cursor-pointer"
            onClick={() => handlePayment('Pro')}
          >
            Choose
          </button>
        </div>

        <div className="border-1 border-gray-400 p-4 rounded-xl w-xs">
          <div className="flex gap-1">
            <h3 className="text-sm bg-purple-700 text-gray-50 w-fit px-1 rounded-sm">Pro+</h3>
            {userData?.plans && JSON.parse(userData?.plans).planName === "ProPlus" && JSON.parse(userData?.plans).billedAnnually === isChecked && <span className="text-sm bg-green-700 text-gray-50 w-fit px-2 rounded-full">Selected</span>}
          </div>
          
          <p className="text-xs text-gray-600 mt-1">Essential tools for budget tracking and analysis</p>

          <p className="text-3xl my-5">Rs. {isChecked ? '39': '49'}<span className="text-sm ml-1 text-gray-500">monthly</span></p>

          <p className="text-xs text-gray-600">What's included?</p>
          <ul className="text-sm flex flex-col gap-1 mt-2">
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Financial Calculators</li>
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Budgeting tools</li>
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> Asset management</li>
            <li className="flex gap-1"><GiDiamonds className="text-gray-700 relative top-0.5" /> AI analysis</li>
          </ul>

          <button
            className="w-full bg-purple-700 text-gray-50 rounded-md text-sm py-2 mt-5 scale-light cursor-pointer"
            onClick={() => handlePayment('ProPlus')}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  )
}
