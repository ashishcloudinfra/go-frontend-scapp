import { useState } from "react";
import { StaffFormValues } from "../../types/Staff";

interface IStaffFormProps {
  formValues?: StaffFormValues;
  onFormSubmit: (formValues: StaffFormValues) => void;
}

export default function StaffForm(props: IStaffFormProps) {
  const [formValues, setFormValues] = useState<StaffFormValues>(props.formValues || {
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",

    // Job and Employment Details
    jobTitle: "",
    department: "",
    dateOfJoining: "",
    salary: 0,
    employmentType: 'Permanent',
    supervisorName: "",

    // Skills and Certifications
    certifications: '',
    specializedSkills: '',
    yearsOfExperience: '0',

    // Emergency and Health Information
    emergencyContactName: "",
    emergencyContactNumber: "",
    medicalConditions: "",

    // Additional Fields
    bankAccountDetails: "",
    joiningBonus: "",
    endOfContractDate: "",
  });

  const [errors, setErrors] = useState<Partial<StaffFormValues>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<StaffFormValues> = {};
    if (!formValues.firstName) newErrors.firstName = "First name is required.";
    if (!formValues.lastName) newErrors.lastName = "Last name is required.";
    if (!formValues.contactNumber) newErrors.contactNumber = "Contact number is required.";
    if (!formValues.email) newErrors.email = "Email address is required.";
    if (!formValues.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (!formValues.gender) newErrors.gender = "Gender is required.";
    if (!formValues.address) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, files } = e.target;
  //   if (files && files[0]) {
  //     setFormValues({ ...formValues, [name]: files[0] });
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      props.onFormSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 md:w-2/3">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-4">Personal Information</h2>
          <div className="mb-4 ">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          <div className="mb-4 ">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>

          <div className="mb-4 ">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4 ">
            <label>Photo</label>
            <input
              type="file"
              name="photo"
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label htmlFor="verificationIdFile">Verification Id Attachment(PDF)</label>
            <input
              type="file"
              name="verificationIdFile"
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formValues.dateOfBirth}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
          </div>

          <div className="mb-4 ">
            <label>Gender</label>
            <select
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <div className="mb-4 ">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formValues.contactNumber}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
          </div>

          <div className="mb-4 ">
            <label>Address</label>
            <textarea
              name="address"
              value={formValues.address}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Job and Employment Details</h2>

          <div className="mb-4 ">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formValues.jobTitle}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formValues.department}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formValues.dateOfJoining}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={formValues.salary}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Employment Type</label>

            <select
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="employmentType"
              value={formValues.employmentType}
              onChange={handleChange}
            >
              <option value="Permanent">Permanent</option>
              <option value="Contractual">Contractual</option>
            </select>
          </div>

          <div className="mb-4 ">
            <label>Supervisor Name</label>
            <input
              type="text"
              name="supervisorName"
              value={formValues.supervisorName}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Skills and Certifications</h2>
          <div className="mb-4 ">
            <label>Certifications</label>
            <input
              type="text"
              name="certifications"
              value={formValues.certifications}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Specialized Skills</label>
            <input
              type="text"
              name="specializedSkills"
              value={formValues.specializedSkills}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formValues.yearsOfExperience}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Emergency and Health Information</h2>
          <div className="mb-4 ">
            <label>Emergency Contact Name</label>
            <input
              type="text"
              name="emergencyContactName"
              value={formValues.emergencyContactName}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Emergency Contact Number</label>
            <input
              type="text"
              name="emergencyContactNumber"
              value={formValues.emergencyContactNumber}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Medical Conditions</label>
            <textarea
              name="medicalConditions"
              value={formValues.medicalConditions}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Additional Fields</h2>
          <div className="mb-4 ">
            <label>Bank Account Details</label>
            <textarea
              name="bankAccountDetails"
              value={formValues.bankAccountDetails}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>Joining Bonus</label>
            <input
              type="text"
              name="joiningBonus"
              value={formValues.joiningBonus}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-4 ">
            <label>End of Contract Date</label>
            <input
              type="date"
              name="endOfContractDate"
              value={formValues.endOfContractDate}
              onChange={handleChange}
              className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
