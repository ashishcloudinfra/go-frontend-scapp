export interface MemberRequestBody {
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
