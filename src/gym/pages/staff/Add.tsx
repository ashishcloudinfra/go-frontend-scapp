import PageHeading from "../../components/PageHeading";
import { StaffFormValues, StaffRequestBody } from "../../../types/Staff";
import StaffForm from "../../components/StaffForm";
import { useAppDispatch } from "../../../app/hooks";
import { registerStaffByAdmin } from "../../../app/actions/gym/staff";
import { useNavigate } from "react-router";

export default function AddStaff() {
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
    const [err] = await dispatch(registerStaffByAdmin(data));
    if (err) {
      console.log(err)
      return;
    }
    navigate('/gym/admin/staff/list');
  }

  return (
    <div className="p-8">
      <PageHeading
        title="Add staff"
        description="Add staff details in below form"
      />
      <StaffForm onFormSubmit={onHandleSubmit} />
    </div>
  );
}
