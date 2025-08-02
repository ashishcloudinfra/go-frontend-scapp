import { BsStars } from "react-icons/bs";
import { useAppSelector } from "../../../app/hooks";
import { capitalizeFirstLetter } from "../../../helpers";

export default function Dashboard() {
  const { data: userData } = useAppSelector(s => s.user);

  return (
    <div>
      <div className="flex">
        <h1 className="text-2xl font-semibold">Welcome, {capitalizeFirstLetter(userData?.firstName || '')}</h1>
        <BsStars size={30} color="orange" />
      </div>
      <p className="text-sm text-gray-600">
        This is your main content. Resize the window to see the responsive
        behavior of the sidenav.
      </p>
    </div>
  );
}