import { registerMemberWithUserNameAndPassword } from "../../../app/actions/gym/member";
import { useAppDispatch } from "../../../app/hooks";
import { MembershipPlan } from "../../../types/MembershipPlan";
import FormComponent from "../../components/FormComponent";

export interface INewMemberRegistrationProps {
  companyId: string;
  membershipPlans: MembershipPlan[];
}

export default function NewMemberRegistration(props: INewMemberRegistrationProps) {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = (values: any) => {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      return;
    }
    values = {
      ...values,
      metadata: JSON.stringify(values.metadata),
      role: "member",
      permissions: "[]",
      status: 'review',
    }
    console.log(values);
    dispatch(registerMemberWithUserNameAndPassword(props.companyId, values));
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl">Member Registration</h1>
      <div>
        <FormComponent
          schema={[
            {
              label: 'First Name',
              name: 'firstName',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your first name',
              required: true
            },
            {
              label: 'Last Name',
              name: 'lastName',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your last name',
              required: true
            },
            {
              label: 'Gender',
              name: 'gender',
              type: 'select',
              initValue: '',
              placeholder: 'Select your gender',
              required: true,
              options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]
            },
            {
              label: 'Date of Birth',
              name: 'dob',
              type: 'date',
              initValue: '',
              placeholder: 'Select your date of birth',
              required: true
            },
            {
              label: 'Contact',
              name: 'phone',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your contact number',
              required: true
            },
            {
              label: 'Email',
              name: 'email',
              type: 'email',
              initValue: '',
              placeholder: 'Enter your email',
              required: true
            },
            {
              label: 'Address',
              name: 'address',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your address',
              required: true
            },
            {
              label: 'City',
              name: 'city',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your city',
              required: true
            },
            {
              label: 'State',
              name: 'state',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your state',
              required: true
            },
            {
              label: 'Country',
              name: 'country',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your country',
              required: true
            },
            {
              label: 'Zip Code',
              name: 'zip',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your zip code',
              required: true
            },
            {
              label: 'Verification id',
              name: 'metadata.documentDetails.idNumber',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your Verification id',
              required: true
            },
            {
              label: 'Username',
              name: 'username',
              type: 'text',
              initValue: '',
              placeholder: 'Enter your username',
              required: true
            },
            {
              label: 'Password',
              name: 'password',
              type: 'password',
              initValue: '',
              placeholder: 'Enter your password',
              required: true
            },
            {
              label: 'Confirm Password',
              name: 'confirmPassword',
              type: 'confirmPassword',
              initValue: '',
              placeholder: 'Enter your password again',
              required: true
            },
            {
              label: 'Plan',
              name: 'plans',
              type: 'select',
              initValue: '',
              placeholder: 'Select your plan',
              required: true,
              options: props.membershipPlans.map(p => ({ label: `${p.name} - ${p.duration}`, value: p.id }))
            },
          ]}
          onFormSubmit={onFormSubmit}          
        />
      </div>
    </div>
  )
}
