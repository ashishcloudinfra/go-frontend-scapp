import { useMemo } from 'react';
import { editMember } from '../../../app/actions/gym/member';
import { useAppDispatch } from '../../../app/hooks';
import { MemberRequestBody } from '../../../types/MemberRequestBody';
import MemberRegistrationForm, { MemberRegistartionFormValues } from '../../components/MemberRegistrationForm';
import PageHeading from '../../components/PageHeading';
import { MembershipPlan } from '../../../types/MembershipPlan';
import { MemberDetailWithMetadata } from '../../../types/Member';
import { convertMemberDetailDataToFormData } from '../../../helpers';

export interface IEditMemberDetailsProps {
  memberDetail: MemberDetailWithMetadata;
  membershipPlans: MembershipPlan[];
}

export default function EditMemberDetails(props: IEditMemberDetailsProps) {
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (values: MemberRegistartionFormValues) => {
    const data: MemberRequestBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dob: values.dateOfBirth,
      address: values.address,
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
      city: values.city,
      state: values.state,
      zip: values.zip,
      country: values.country,
      role: props.memberDetail.role,
      permissions: props.memberDetail.permissions,
      plans: values.membershipType,
      status: props.memberDetail.status,
    };
    const [err] = await dispatch(editMember(props.memberDetail.iamId, data));
    if (err) {
      console.log('Something failed');
      return;
    }
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
        title="Edit member"
        description="Edit member details"
      />
      <MemberRegistrationForm
        formValues={convertMemberDetailDataToFormData(props.memberDetail)}
        membershipPlansValueMap={membershipPlansValueMap}
        onSubmitHandler={onSubmitHandler}
      />
    </div>
  );
}
