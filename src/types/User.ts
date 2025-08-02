export interface UserDetail {
  id: string; // UUID
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  dob?: string;
  metadata?: string; // TEXT field, optional
  createdAt: Date;
  updatedAt: Date;
  iamId: string; // UUID, foreign key
  plans?: string;
};