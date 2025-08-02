import { Link } from "react-router";
import { useAppSelector } from "../../../../app/hooks";
import { MdRestaurantMenu } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { Fragment } from "react/jsx-runtime";
import useNavigateWithQueryParams from "../../../../hooks/useNavigateWithQueryParams";

export default function FooterNav() {
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany);
  const { getNewUrlWithQueryParams } = useNavigateWithQueryParams();

  const navItems = [
    {
      title: 'Menu',
      icon: <MdRestaurantMenu />,
      link: `/restaurant/customer/menu/${selectedCompany?.id || ''}`
    },
    {
      title: 'Orders',
      icon: <BiSolidFoodMenu />,
      link: `/restaurant/customer/order/${selectedCompany?.id || ''}`
    },
    {
      title: 'Pay',
      icon: <FaRupeeSign />,
      link: `/restaurant/customer/pay/${selectedCompany?.id || ''}`
    }
  ]
  return (
    <div className="fixed bottom-2 w-full">
      <nav className="bg-primary rounded-lg px-4 py-3 text-gray-100 flex gap-4 w-fit mx-auto">
        {navItems.map((item, index) => (
          <Fragment key={item.title}>
            <Link
              to={getNewUrlWithQueryParams(item.link)}
              className="flex items-center gap-1 scale-light"
            >
              {item.icon}
              {item.title}
            </Link>
            {index !== navItems.length - 1 && <div className="border-r border-gray-100 h-6"></div>}
          </Fragment>
        ))}
      </nav>
    </div>
  )
}
