import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { StaffDetailWithMetadata, StaffFormValues, StaffRequestBody } from "../../../types/Staff";
import PageHeading from "../../components/PageHeading";
import StaffForm from "../../components/StaffForm";
import { convertStaffDetailDataToFormData } from "../../../helpers";
import { editMember } from "../../../app/actions/gym/member";

export interface IEditStaffDetailProps {
  staffDetail: StaffDetailWithMetadata;
}

export default function EditStaffDetail(props: IEditStaffDetailProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (formValues: StaffFormValues) => {
      const data: StaffRequestBody = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: formValues.contactNumber,
        address: formValues.address,
        city: '',
        state: '',
        zip: '',
        country: '',
        dob: formValues.dateOfBirth,
        gender: formValues.gender,
        metadata: JSON.stringify({
          employmentDetails: {
            jobTitle: formValues.jobTitle,
            department: formValues.department,
            dateOfJoining: formValues.dateOfJoining,
            salary: formValues.salary,
            employmentType: formValues.employmentType,
            supervisorName: formValues.supervisorName,
          },
          medicalDetails: {
            medicalConditions: formValues.medicalConditions || '',
            allergies: '',
            fitnessGoals: '',
            emergencyContactName: formValues.emergencyContactName || '',
            emergencyContactNumber: formValues.emergencyContactNumber || '',
          },
          skillsAndCertifications: {
            certifications: formValues.certifications || '',
            SpecializedSkills: formValues.specializedSkills || '',
            YearsofExperience: formValues.yearsOfExperience || '',
          },
          AdditionalField: {
            BankAccountDetails: formValues.bankAccountDetails || '',
            JoiningBonus: formValues.joiningBonus || '',
            EndofContractDate: formValues.endOfContractDate || '',
          },
        }),
        role: 'staff',
        permissions: '',
        plans: '',
        status: 'authorized'
      };
      const [err] = await dispatch(editMember(props.staffDetail.iamId, data));
      if (err) {
        console.log(err)
        return;
      }
      navigate('/gym/admin/staff/list');
    }

  return (
    <div className="p-8">
      <PageHeading
        title="Edit staff"
        description="Edit staff details in below form"
      />
      <StaffForm formValues={convertStaffDetailDataToFormData(props.staffDetail)} onFormSubmit={onHandleSubmit} />
    </div>
  );
}
