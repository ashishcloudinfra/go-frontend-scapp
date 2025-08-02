import MemberRegistrationForm, { MemberRegistartionFormValues } from "../../components/MemberRegistrationForm";
import { useNavigate } from "react-router";
import PageHeading from "../../components/PageHeading";
import { MembershipPlan } from "../../../types/MembershipPlan";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { registerMember } from "../../../app/actions/gym/member";
import { MemberRequestBody } from "../../../types/MemberRequestBody";

export interface IMemberRegistrationProps {
  membershipPlans: MembershipPlan[];
}

// TODO::Manish -> Send mail to member with username and password
export default function MemberRegistration(props: IMemberRegistrationProps) {
  const { selectedCompany } = useAppSelector(s => s.companies)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (values: MemberRegistartionFormValues) => {
    const data: MemberRequestBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dob: values.dateOfBirth,
      address: values.address,
      city: values.city,
      state: values.state,
      zip: values.zip,
      country: values.country,
      phone: values.contact,
      gender: values.gender,
      metadata: JSON.stringify({
        membershipDetails: {
          membershipType: values.membershipType,
          startDate: values.startDate,
          endDate: values.endDate,
          membershipFee: values.membershipFee,
        },
        medicalDetails: {
          medicalConditions: values.medicalConditions || '',
          allergies: values.allergies || '',
          fitnessGoals: values.fitnessGoals || '',
          emergencyContactName: values.emergencyContactName || '',
          emergencyContactNumber: values.emergencyContactNumber || '',
        },
        fitnessDetails: {
          height: values.height || '',
          weight: values.weight || '',
          bodyFatPercentage: values.bodyFatPercentage || '',
          fitnessAssessmentNotes: values.fitnessAssessmentNotes || '',
          photo: values.photo || '',
        },
        trainingDetails: {
          preferredTrainer: values.preferredTrainer || '',
          preferredTimeSlot: values.preferredTimeSlot || '',
          specialRequests: values.specialRequests || '',
        }
      }),
      role: "member",
      permissions: "[]",
      plans: values.membershipType,
      status: 'authorized',
    };
    const [err] = await dispatch(registerMember(selectedCompany?.id || '', data));
    if (err) {
      console.log('Something failed');
      return;
    }
    navigate('/gym/admin/member/list');
  }

  const membershipPlansValueMap = useMemo(() => { return props.membershipPlans.reduce((memo, curr) => {
    memo.push({
      id: curr.id,
      name: curr.name,
      price: curr.price,
      duration: curr.duration,
    });
    return memo;
  }, [] as {
      id: string;
      name: string;
      price: number;
      duration: string;
  }[]); }, [props.membershipPlans]);

  return (
    <div className="p-8">
      <PageHeading
        title="Add member"
        description="Add member to your company"
      />
      <MemberRegistrationForm membershipPlansValueMap={membershipPlansValueMap} onSubmitHandler={onSubmitHandler} />
    </div>
  );
}
