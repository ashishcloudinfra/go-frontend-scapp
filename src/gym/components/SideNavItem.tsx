import { ReactNode } from "react";

interface ISideNavItem {
  text: string;
  icon: ReactNode;
}

export default function SideNavItem(props: ISideNavItem) {
  return (
    <div className="flex py-3 px-2 hover:bg-primary hover:text-white hover:rounded-full hover:cursor-pointer">
      {props.icon}
      <span className="pl-2">
        {props.text}
      </span>
    </div>
  )
}
