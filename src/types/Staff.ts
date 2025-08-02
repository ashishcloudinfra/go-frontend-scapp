export interface StaffFormValues {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;

  // Job and Employment Details
  jobTitle: string;
  department: string;
  dateOfJoining: string;
  salary: number;
  employmentType: 'Permanent' | 'Contractual';
  supervisorName: string;

  // Skills and Certifications
  certifications: string;
  specializedSkills: string;
  yearsOfExperience: string;

  // Emergency and Health Information
  emergencyContactName: string;
  emergencyContactNumber: string;
  medicalConditions: string;

  // Additional Fields
  bankAccountDetails: string;
  joiningBonus: string;
  endOfContractDate: string;
}

export interface StaffShortDetail {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  status: 'authorized' | 'review' | 'deactivated';
  phone: string;
  email: string;
  iamId: string;
}

export interface StaffDetailMetadata {
  medicalDetails: {
    medicalConditions?: string;
    allergies?: string;
    fitnessGoals?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
  };
  employmentDetails: {
    jobTitle: string;
    department: string;
    dateOfJoining: string;
    salary: string;
    employmentType: string;
    supervisorName: string;
  };
  skillsAndCertifications: {
    certifications: string;
    SpecializedSkills: string;
    YearsofExperience: string;
  };
  AdditionalField: {
    BankAccountDetails: string;
    JoiningBonus: string;
    EndofContractDate: string;
  }
};

export interface StaffDetailWithMetadata {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  dob: string;
  gender: string;
  metadata: StaffDetailMetadata;
  status: 'authorized' | 'review' | 'deactivated';
  iamId: string;
  role: string;
  permissions: string;
  plans: string;
};

export interface StaffDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  dob: string;
  gender: string;
  metadata: string;
  status: 'authorized' | 'review' | 'deactivated';
  iamId: string;
  role: string;
  permissions: string;
  plans: string;
};

export interface StaffRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  dob: string;
  gender: string;
  metadata: string;
  role: string;
  permissions: string;
  plans: string;
  status: 'authorized' | 'review' | 'deactivated';
};
