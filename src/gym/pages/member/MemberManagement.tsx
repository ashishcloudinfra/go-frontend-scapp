import { IoMdPersonAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { MemberShortDetail } from "../../../types/Member";
import MemberCard from "../../components/MemberCard";
import PageHeading from "../../components/PageHeading";
import { useEffect, useState } from "react";

export interface IMemberManagementProps {
  members: MemberShortDetail[];
}

type MemberStatus = 'all' | 'review' | 'authorized' | 'deactivated';

export default function MemberManagement(props: IMemberManagementProps) {
  const navigate = useNavigate();

  const [selectedMemberStatus, setSelectedMemberStatus] = useState<MemberStatus>('all');
  const [memberList, setMemberList] = useState<MemberShortDetail[]>([]);

  useEffect(() => {
    if (selectedMemberStatus === 'all') {
      setMemberList(props.members);
    } else {
      setMemberList(props.members.filter((member: MemberShortDetail) => member.status === selectedMemberStatus));
    }
  }, [selectedMemberStatus, props.members]);

  const onMemberTileClick = (memberDetail: MemberShortDetail) => {
    navigate(`/gym/admin/member/view/${memberDetail.iamId}`);
  }

  return (
    <div>
      <div className="p-8 flex justify-between items-center">
        <PageHeading
          title="Manage members"
          description="Manage your members details"
        />
        <Link
          to={'/gym/admin/member/add'}
          type="button"
          className="text-white text-xs bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg px-5 py-3 text-center inline-flex items-center me-2 hover:scale-105 transform transition duration-200 self-start"
        >
          <IoMdPersonAdd className="mr-2" size={22} />
          Add member
        </Link>
      </div>
      <div className="px-8 py-4 sm:w-1/2 xs:w-full md:w-1/3">
        <select
          className="w-full p-3 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-sm"
          value={selectedMemberStatus}
          onChange={(e) => setSelectedMemberStatus(e.target.value as MemberStatus)} 
        >
          <option value="all">All members</option>
          <option value="authorized">Authorized members</option>
          <option value="review">Status in review</option>
          <option value="deactivated">Deactivated members</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 p-6">
        {memberList.map((member: MemberShortDetail) => <MemberCard
          key={member.id}
          member={member}
          onMemberTileClick={() => onMemberTileClick(member)}
        />)}
      </div>
    </div>
  );
}
