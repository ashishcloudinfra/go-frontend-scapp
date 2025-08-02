import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { parsedData } from "../../../helpers";
import FormComponent from "../../components/FormComponent";
import { MemberRequestBody } from "../../../types/MemberRequestBody";
import { editMember } from "../../../app/actions/gym/member";

// {
//   "membershipDetails": {
//       "membershipType": "9451f42a-8f21-4e2b-841e-017183c62679",
//       "startDate": "2025-01-01",
//       "endDate": "",
//       "membershipFee": 2500
//   },
//   "medicalDetails": {
//       "medicalConditions": "",
//       "allergies": "",
//       "fitnessGoals": "",
//       "emergencyContactName": "",
//       "emergencyContactNumber": ""
//   },
//   "fitnessDetails": {
//       "height": "",
//       "weight": "",
//       "bodyFatPercentage": "",
//       "fitnessAssessmentNotes": "",
//       "photo": ""
//   },
//   "trainingDetails": {
//       "preferredTrainer": "",
//       "preferredTimeSlot": "",
//       "specialRequests": ""
//   }
// }

export default function EditProfile() {
  const userData = useAppSelector(s => s.user.data);
  const tokenData = useAppSelector(s => s.token.data);
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState('basic')

  const userDetail = useMemo(() => {
    if (!userData) return null;
    return parsedData(userData);
  }, [userData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onProfileSubmit = async (values: any) => {
    if (!userDetail) return;

    const data = {
      ...userDetail,
      metadata: JSON.stringify({
        ...userDetail.metadata,
      }),
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dob: values.dob,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
      city: values.city,
      state: values.state,
      zip: values.zip,
      country: values.country,
    };
    const [err] = await dispatch(editMember(tokenData?.id || '', data as unknown as MemberRequestBody));
    if (err) {
      console.log('Something failed');
      return;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFitnessSubmit = async (values: any) => {
    if (!userDetail) return;

    const data = {
      ...userDetail,
      metadata: JSON.stringify({
        ...userDetail.metadata,
        fitnessDetails: {
          ...userDetail.metadata.fitnessDetails,
          height: values.height,
          weight: values.weight,
          bodyFatPercentage: values.bodyFatPercentage,
          fitnessAssessmentNotes: values.fitnessAssessmentNotes,
          photo: values.photo,
        }
      }),
    };
    const [err] = await dispatch(editMember(tokenData?.id || '', data as unknown as MemberRequestBody));
    if (err) {
      console.log('Something failed');
      return;
    }
  }

  if (!userDetail) {
    return null;
  }

  console.log('***', userDetail);

  return (
    <div className="p-8 flex flex-col gap-4">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        {[
          { label: 'Basic details', value: 'basic' },
          { label: 'Fitness Details', value: 'fitnessDetails' },
        ].map(v => <li
          key={v.value}
          className={`me-2 cursor-pointer ${selectedTab === v.value ? 'text-red-400' : ''}`}
          onClick={() => setSelectedTab(v.value)}
        >
          <div aria-current="page" className="inline-block p-4 bg-gray-100 rounded-t-lg">{v.label}</div>
        </li>)}
      </ul>
      <div>
        {selectedTab === 'basic' && <div id="profile-details">
          <FormComponent
            schema={[
              {
                label: 'First Name',
                name: 'firstName',
                type: 'text',
                initValue: userDetail.firstName,
                placeholder: 'Enter your first name',
                required: true
              },
              {
                label: 'Last Name',
                name: 'lastName',
                type: 'text',
                initValue: userDetail.lastName,
                placeholder: 'Enter your last name',
                required: true
              },
              {
                label: 'Gender',
                name: 'gender',
                type: 'select',
                initValue: userDetail.gender,
                placeholder: 'Select your gender',
                required: true,
                options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]
              },
              {
                label: 'Date of Birth',
                name: 'dob',
                type: 'date',
                initValue: userDetail.dob,
                placeholder: 'Select your date of birth',
                required: true
              },
              {
                label: 'Contact',
                name: 'phone',
                type: 'text',
                initValue: userDetail.phone,
                placeholder: 'Enter your contact number',
                required: true
              },
              {
                label: 'Email',
                name: 'email',
                type: 'email',
                initValue: userDetail.email,
                placeholder: 'Enter your email',
                required: true
              },
              {
                label: 'Address',
                name: 'address',
                type: 'text',
                initValue: userDetail.address,
                placeholder: 'Enter your address',
                required: true
              },
              {
                label: 'City',
                name: 'city',
                type: 'text',
                initValue: userDetail.city,
                placeholder: 'Enter your city',
                required: true
              },
              {
                label: 'State',
                name: 'state',
                type: 'text',
                initValue: userDetail.state,
                placeholder: 'Enter your state',
                required: true
              },
              {
                label: 'Country',
                name: 'country',
                type: 'text',
                initValue: userDetail.country,
                placeholder: 'Enter your country',
                required: true
              },
              {
                label: 'Zip Code',
                name: 'zip',
                type: 'text',
                initValue: userDetail.zip,
                placeholder: 'Enter your zip code',
                required: true
              }
            ]}
            onFormSubmit={onProfileSubmit}
          />
        </div>}
        {selectedTab === 'fitnessDetails' && <div id="fitnessDetails">
          <FormComponent
            schema={[
              {
                label: 'Height',
                name: 'height',
                type: 'text',
                initValue: userDetail.metadata.fitnessDetails.height || '',
                placeholder: 'Enter your height',
                required: false
              },
              {
                label: 'Weight',
                name: 'weight',
                type: 'text',
                initValue: userDetail.metadata.fitnessDetails.weight || '',
                placeholder: 'Enter your weight',
                required: false
              },
              {
                label: 'Body Fat Percentage',
                name: 'bodyFatPercentage',
                type: 'text',
                initValue: userDetail.metadata.fitnessDetails.bodyFatPercentage || '',
                placeholder: 'Enter your body fat percentage',
                required: false
              },
              {
                label: 'Fitness Assessment Notes',
                name: 'fitnessAssessmentNotes',
                type: 'text',
                initValue: userDetail.metadata.fitnessDetails.fitnessAssessmentNotes || '',
                placeholder: 'Enter your fitness assessment notes',
                required: false
              },
              {
                label: 'Photo',
                name: 'photo',
                type: 'file',
                initValue: userDetail.metadata.fitnessDetails.photo || '',
                placeholder: 'Enter your photo',
                required: false
              }
            ]}
            onFormSubmit={onFitnessSubmit}
          />
        </div>}
      </div>
    </div>
  )
}
