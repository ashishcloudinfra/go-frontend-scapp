import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../components/Navbar";
import { fetchAllCompanies } from "../../app/actions/company";
import { useNavigate } from "react-router";

export default function Home() {
  const tokenData = useAppSelector(s => s.token.data);
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenData) {
      return;
    }
    dispatch(fetchAllCompanies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData]);

  useEffect(() => {
    if (!tokenData || !selectedCompany) {
      return;
    }
    if (selectedCompany.type === 'PersonalFinance') {
      navigate('/personalfinance')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData, selectedCompany]);

  return (
    <div>
      <Navbar />

      <div className="p-2 pt-28 md:p-8 md:pt-32 flex flex-col gap-16">
        <div className="flex flex-col gap-5 px-0 md:px-10">
          <h1 className="text-5xl md:text-8xl text-center font-bold leading-[1.2]">Simplify Your Systems. Amplify Your Control.</h1>
          <p className="text-gray-600 text-sm md:text-lg px-8 md:px-10 text-center">We empower individuals and businesses with intuitive tools to manage everyday operations. Our all-in-one platform is designed to cut complexity, boost productivity, and give you full control at your fingertips.</p>
        </div>

        <div id="services" className="px-0 md:px-10 flex flex-col gap-4">
          <h2 className="text-center text-2xl underline underline-offset-8">Our services</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="p-6 border-1 border-gray-300 rounded-2xl w-xs flex flex-col justify-between gap-2">
              <div className="flex flex-col gap-3">
                <img src="images/personalfinance.png" width={60} alt="personal finance icon" />
                <h3 className="text-xl text-primary">Personal finance</h3>
                <p className="text-sm text-gray-600">Simplify your finances — from budgeting and manual asset tracking to smart AI insights and powerful calculators, all in one place.</p>
              </div>
              <button
                className="bg-primary text-tertiary w-fit px-4 py-2 rounded-sm scale-light"
                onClick={() => navigate('/signup?type=PersonalFinance')}
              >
                Get started
              </button>
            </div>

            <div className="p-6 border-1 border-gray-300 rounded-2xl w-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <img src="images/gym.png" width={60} alt="personal finance icon" />
                <h3 className="text-xl text-primary">Gym management</h3>
                <p className="text-sm text-gray-600">Simplify the way you run your gym with an all-in-one platform that handles member management, staff coordination, event planning, real-time notifications, and much more — everything you need to keep your fitness business running strong.</p>
              </div>
              <button
                disabled
                className="bg-primary text-tertiary w-fit px-4 py-2 rounded-sm scale-light disabled:bg-gray-500 disabled:pointer-events-none"
              >
                Coming soon
              </button>
            </div>

            <div className="p-6 border-1 border-gray-300 rounded-2xl w-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <img src="images/restaurant.png" width={60} alt="personal finance icon" />
                <h3 className="text-xl text-primary">Restaurant management</h3>
                <p className="text-sm text-gray-600">Streamline your restaurant operations with ease — manage menus, handle orders, and track everything online in real-time, all from one smart platform.</p>
              </div>
              <button
                disabled
                className="bg-primary text-tertiary w-fit px-4 py-2 rounded-sm scale-light disabled:bg-gray-500 disabled:pointer-events-none"
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
