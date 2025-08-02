import React, { useState } from "react";
import { useNavigate } from "react-router";
import { capitalizeFirstLetter, fallbackImage } from "../../../helpers";
import { StaffDetailWithMetadata } from "../../../types/Staff";
import { FaUserAltSlash } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MEMBERSHIP_STATUS_DICT } from "../../../helpers/constant";
import { useAppDispatch } from "../../../app/hooks";
import { editMember } from "../../../app/actions/gym/member";

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

export interface IViewStaffDetailsProps {
  staffDetail: StaffDetailWithMetadata;
}

const ViewStaffDetails = (props: IViewStaffDetailsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [memberStatus, setMemberStatus] = useState(props.staffDetail.status);

  const onEditStaffClick = () => {
    navigate(`/gym/admin/staff/edit/${props.staffDetail.iamId}`);
  }

  const handleMembershipStatusChange = async () => {
    const [err] = await dispatch(editMember(props.staffDetail.iamId, {
      ...props.staffDetail,
      role: props.staffDetail.role,
      permissions: props.staffDetail.permissions,
      plans: props.staffDetail.permissions,
      metadata: JSON.stringify(props.staffDetail.metadata),
      status: memberStatus === 'authorized' ? 'deactivated' : 'authorized'
    }));
    if (err) return;

    setMemberStatus(memberStatus === 'authorized' ? 'deactivated' : 'authorized');
  }

  return (
    <div className=" p-6 flex flex-col gap-4">
      <div className="flex flex-wrap justify-between items-center border-2 border-stone-300 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <img
            src={fallbackImage(props.staffDetail.gender)}
            alt="Member"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-gray-800">
              {capitalizeFirstLetter(props.staffDetail.firstName)} {capitalizeFirstLetter(props.staffDetail.lastName)}
            </h2>
            <p className="text-gray-600 text-sm">{props.staffDetail.email}</p>
            <p className="text-gray-500 text-sm">{MEMBERSHIP_STATUS_DICT[memberStatus]}</p>
          </div>
        </div>

        <div className="mt-2 md:mt-0 flex gap-2">
          <button className="text-cyan-700 flex gap-1 border border-cyan-700 hover:bg-blue-100 focus:ring-4 focus:outline-hidden focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onEditStaffClick}>
            <MdEdit size={18} /> Edit details
          </button>
          {memberStatus === 'authorized' && <button className="text-rose-700 flex gap-1 border border-rose-700 hover:bg-rose-100 focus:ring-4 focus:outline-hidden focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleMembershipStatusChange}>
            <FaUserAltSlash size={18} /> Deactivate staff
          </button>}
          {memberStatus !== 'authorized' && <button className="text-emerald-700 flex gap-1 border border-emerald-700 hover:bg-emerald-100 focus:ring-4 focus:outline-hidden focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleMembershipStatusChange}>
            <FaUserCheck size={18} /> Activate staff
          </button>}
        </div>
      </div>

      {/* Sections */}
      <Section title="Personal Details">
        <DetailRow label="Name" value={`${props.staffDetail.firstName} ${props.staffDetail.lastName}`} />
        <DetailRow label="Gender" value={props.staffDetail.gender} />
        <DetailRow label="DOB" value={props.staffDetail.dob} />
        <DetailRow label="Contact" value={props.staffDetail.phone} />
        <DetailRow label="Email" value={props.staffDetail.email} />
        <DetailRow label="Address" value={props.staffDetail.address} />
      </Section>

      <Section title="Job and Employment Details">
        <DetailRow label="Job titile" value={props.staffDetail.metadata.employmentDetails.jobTitle} />
        <DetailRow label="Department" value={props.staffDetail.metadata.employmentDetails.department} />
        <DetailRow label="Date of joining" value={props.staffDetail.metadata.employmentDetails.dateOfJoining} />
        <DetailRow label="Salary" value={`₹ ${props.staffDetail.metadata.employmentDetails.salary}`} />
        <DetailRow label="Employment type" value={props.staffDetail.metadata.employmentDetails.employmentType} />
        <DetailRow label="Supervisor name" value={`${props.staffDetail.metadata.employmentDetails.supervisorName}`} />
      </Section>

      <Section title="Skills and Certifications">
        <DetailRow label="Certifications" value={props.staffDetail.metadata?.skillsAndCertifications?.certifications || ''} />
        <DetailRow label="Specialized Skills" value={props.staffDetail.metadata?.skillsAndCertifications?.SpecializedSkills || ''} />
        <DetailRow label="Years of Experience" value={props.staffDetail.metadata?.skillsAndCertifications?.YearsofExperience || ''} />
      </Section>

      <Section title="Emergency and Health Information">
        <DetailRow label="Emergency Contact Name" value={props.staffDetail.metadata.medicalDetails.emergencyContactName} />
        <DetailRow label="Emergency Contact Number" value={props.staffDetail.metadata.medicalDetails.emergencyContactNumber} />
        <DetailRow label="Medical Conditions" value={props.staffDetail.metadata.medicalDetails.medicalConditions} />
      </Section>

      <Section title="Additional Fields">
        <DetailRow label="Bank Account Details" value={props.staffDetail.metadata?.AdditionalField?.BankAccountDetails || ''} />
        <DetailRow label="Joining Bonus" value={props.staffDetail.metadata?.AdditionalField?.JoiningBonus || ''} />
        <DetailRow label="End of Contract Date" value={props.staffDetail.metadata?.AdditionalField?.EndofContractDate || ''} />
      </Section>
    </div>
  );
};

export default ViewStaffDetails;
