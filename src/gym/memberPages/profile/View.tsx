import { useMemo } from "react";
import { MdEdit } from "react-icons/md";
import { useAppSelector } from "../../../app/hooks"
import { capitalizeFirstLetter, contactSeparator, fallbackImage, parsedData } from "../../../helpers";
import { useNavigate } from "react-router";

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

export default function ProfileView() {
  const userData = useAppSelector(s => s.user.data);
  const tokenData = useAppSelector(s => s.token.data);
  const navigate = useNavigate();

  const userDetail = useMemo(() => {
    if (!userData) return null;
    return parsedData(userData);
  }, [userData]);

  if (!userDetail || !tokenData) {
    return null;
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <img
            src={fallbackImage(userDetail.gender)}
            alt="Member"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-gray-800">
              {capitalizeFirstLetter(userDetail.firstName)} {capitalizeFirstLetter(userDetail.lastName)}
            </h2>
            <p className="text-gray-600 text-sm">{userDetail.email}</p>
            <p className="text-gray-600 text-sm">@{tokenData.username}</p>
          </div>
        </div>
        <div>
          <button
            className="text-cyan-700 flex gap-1 border border-cyan-700 hover:bg-blue-100 focus:ring-4 focus:outline-hidden focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => { navigate('/gym/member/profile/edit') }}
          >
            <MdEdit size={18} /> Edit details
          </button>
        </div>
      </div>
      <Section title="Personal Details">
        <DetailRow label="Name" value={`${userDetail.firstName} ${userDetail.lastName}`} />
        <DetailRow label="Gender" value={userDetail.gender} />
        <DetailRow label="DOB" value={userDetail.dob} />
        <DetailRow label="Contact" value={contactSeparator(userDetail.phone)} />
        <DetailRow label="Email" value={userDetail.email} />
        <DetailRow label="Address" value={userDetail.address} />
      </Section>

      <Section title="Membership Details">
        <DetailRow label="Start Date" value={userDetail.metadata.membershipDetails?.startDate} />
        <DetailRow label="End Date" value={userDetail.metadata.membershipDetails?.endDate} />
        <DetailRow label="Fee" value={`₹ ${userDetail.metadata.membershipDetails?.membershipFee}`} />
      </Section>

      <Section title="Medical Details">
        <DetailRow label="Conditions" value={userDetail.metadata.medicalDetails?.medicalConditions} />
        <DetailRow label="Allergies" value={userDetail.metadata.medicalDetails?.allergies} />
        <DetailRow label="Fitness Goals" value={userDetail.metadata.medicalDetails?.fitnessGoals} />
        <DetailRow
          label="Emergency Contact"
          value={`${userDetail.metadata.medicalDetails?.emergencyContactName || ''} - ${
            userDetail.metadata.medicalDetails?.emergencyContactNumber || ''
          }`}
        />
      </Section>

      <Section title="Fitness Details">
        <DetailRow label="Height" value={userDetail.metadata.fitnessDetails?.height as string} />
        <DetailRow label="Weight" value={userDetail.metadata.fitnessDetails?.weight as string} />
        <DetailRow label="Body Fat %" value={userDetail.metadata.fitnessDetails?.bodyFatPercentage as string} />
        <DetailRow label="Notes" value={userDetail.metadata.fitnessDetails?.fitnessAssessmentNotes} />
      </Section>

      <Section title="Training Details">
        <DetailRow label="Preferred Trainer" value={userDetail.metadata.trainingDetails?.preferredTrainer} />
        <DetailRow label="Preferred Slot" value={userDetail.metadata.trainingDetails?.preferredTimeSlot} />
        <DetailRow label="Requests" value={userDetail.metadata.trainingDetails?.specialRequests} />
      </Section>
    </div>
  )
}
