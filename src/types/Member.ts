export interface MemberDetailMetadata {
  documentDetails?: {
    idNumber?: string;
    userPhoto?: string | FileList;
    idProof?: string | FileList;
  },
  membershipDetails: {
    membershipType: string;
    startDate: string;
    endDate: string;
    membershipFee: number;
  };
  medicalDetails: {
    medicalConditions?: string;
    allergies?: string;
    fitnessGoals?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
  };
  fitnessDetails: {
    height?: string | number;
    weight?: string | number;
    bodyFatPercentage?: string | number;
    fitnessAssessmentNotes?: string;
  };
  trainingDetails: {
    preferredTrainer?: string;
    preferredTimeSlot?: string;
    specialRequests?: string;
  };
};

export interface MemberDetail {
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
};

export interface MemberDetailWithMetadata {
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
  metadata: MemberDetailMetadata;
  status: 'authorized' | 'review' | 'deactivated';
  iamId: string;
  role: string;
  permissions: string;
  plans: string;
};

export interface MemberShortDetail {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  status: 'authorized' | 'review' | 'deactivated';
  phone: string;
  email: string;
  iamId: string;
}
