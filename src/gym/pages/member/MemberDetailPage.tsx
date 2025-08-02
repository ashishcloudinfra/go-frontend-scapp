import React, { useState } from "react";
import { useNavigate } from "react-router";
import { editMember } from "../../../app/actions/gym/member";
import { useAppDispatch } from "../../../app/hooks";
import { MEMBERSHIP_STATUS_DICT } from "../../../helpers/constant";
import { capitalizeFirstLetter, contactSeparator, fallbackImage } from "../../../helpers";
import { MemberDetailWithMetadata } from "../../../types/Member";
import { MembershipPlan } from "../../../types/MembershipPlan";
import { MdEdit } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-2 border-stone-300 rounded-xl p-4 flex flex-col gap-4">
    <h3 className="text-lg text-gray-700">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div className="items-start flex flex-col gap-1 border-stone-300">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-gray-700 break-words text-sm">{value || "-"}</p>
  </div>
);

export interface IMemberDetailPageProps {
  memberDetail: MemberDetailWithMetadata;
  membershipPlans: MembershipPlan[];
}

const MemberDetailPage = (props: IMemberDetailPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [memberStatus, setMemberStatus] = useState(props.memberDetail.status);

  const onEditMemberClick = () => {
    navigate(`/gym/admin/member/edit/${props.memberDetail.iamId}`);
  }

  const handleMembershipStatusChange = async () => {
    const [err] = await dispatch(editMember(props.memberDetail.iamId, {
      ...props.memberDetail,
      role: props.memberDetail.role,
      permissions: props.memberDetail.permissions,
      plans: props.memberDetail.permissions,
      metadata: JSON.stringify(props.memberDetail.metadata),
      status: memberStatus === 'authorized' ? 'deactivated' : 'authorized'
    }));
    if (err) return;

    setMemberStatus(memberStatus === 'authorized' ? 'deactivated' : 'authorized');
  }

  const selectedPlan = props.membershipPlans.find(mp => mp.id === props.memberDetail.metadata.membershipDetails?.membershipType);

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-wrap justify-between items-center border-2 border-stone-300 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <img
            src={fallbackImage(props.memberDetail.gender)}
            alt="Member"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-gray-800">
              {capitalizeFirstLetter(props.memberDetail.firstName)} {capitalizeFirstLetter(props.memberDetail.lastName)}
            </h2>
            <p className="text-gray-600 text-sm">{props.memberDetail.email}</p>
            <p className="text-gray-500 text-sm">{MEMBERSHIP_STATUS_DICT[memberStatus]}</p>
          </div>
        </div>

        <div className="mt-2 md:mt-0 flex gap-2">
          <button className="text-cyan-700 flex gap-1 border border-cyan-700 hover:bg-blue-100 focus:ring-4 focus:outline-hidden focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onEditMemberClick}>
            <MdEdit size={18} /> Edit details
          </button>
          {memberStatus === 'authorized' && <button className="text-rose-700 flex gap-1 border border-rose-700 hover:bg-rose-100 focus:ring-4 focus:outline-hidden focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleMembershipStatusChange}>
            <FaUserAltSlash size={18} /> Deactivate member
          </button>}
          {memberStatus !== 'authorized' && <button className="text-emerald-700 flex gap-1 border border-emerald-700 hover:bg-emerald-100 focus:ring-4 focus:outline-hidden focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleMembershipStatusChange}>
            <FaUserCheck size={18} /> Activate member
          </button>}
        </div>
      </div>

      {/* Sections */}
      <Section title="Personal Details">
        <DetailRow label="Name" value={`${props.memberDetail.firstName} ${props.memberDetail.lastName}`} />
        <DetailRow label="Gender" value={props.memberDetail.gender} />
        <DetailRow label="DOB" value={props.memberDetail.dob} />
        <DetailRow label="Contact" value={contactSeparator(props.memberDetail.phone)} />
        <DetailRow label="Email" value={props.memberDetail.email} />
        <DetailRow label="Address" value={props.memberDetail.address} />
      </Section>

      <Section title="Membership Details">
        <DetailRow label="Type" value={ selectedPlan ? `${selectedPlan?.name} - ${selectedPlan?.duration}` : '' } />
        <DetailRow label="Start Date" value={props.memberDetail.metadata.membershipDetails?.startDate} />
        <DetailRow label="End Date" value={props.memberDetail.metadata.membershipDetails?.endDate} />
        <DetailRow label="Fee" value={`₹ ${props.memberDetail.metadata.membershipDetails?.membershipFee}`} />
      </Section>

      <Section title="Medical Details">
        <DetailRow label="Conditions" value={props.memberDetail.metadata.medicalDetails?.medicalConditions} />
        <DetailRow label="Allergies" value={props.memberDetail.metadata.medicalDetails?.allergies} />
        <DetailRow label="Fitness Goals" value={props.memberDetail.metadata.medicalDetails?.fitnessGoals} />
        <DetailRow
          label="Emergency Contact"
          value={`${props.memberDetail.metadata.medicalDetails?.emergencyContactName || ''} - ${
            props.memberDetail.metadata.medicalDetails?.emergencyContactNumber || ''
          }`}
        />
      </Section>

      <Section title="Fitness Details">
        <DetailRow label="Height" value={props.memberDetail.metadata.fitnessDetails?.height as string} />
        <DetailRow label="Weight" value={props.memberDetail.metadata.fitnessDetails?.weight as string} />
        <DetailRow label="Body Fat %" value={props.memberDetail.metadata.fitnessDetails?.bodyFatPercentage as string} />
        <DetailRow label="Notes" value={props.memberDetail.metadata.fitnessDetails?.fitnessAssessmentNotes} />
      </Section>

      <Section title="Training Details">
        <DetailRow label="Preferred Trainer" value={props.memberDetail.metadata.trainingDetails?.preferredTrainer} />
        <DetailRow label="Preferred Slot" value={props.memberDetail.metadata.trainingDetails?.preferredTimeSlot} />
        <DetailRow label="Requests" value={props.memberDetail.metadata.trainingDetails?.specialRequests} />
      </Section>
    </div>
  );
};

export default MemberDetailPage;
