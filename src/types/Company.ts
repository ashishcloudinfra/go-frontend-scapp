export type CompanyType = 'GYM' | 'Restaurant' | 'PersonalFinance';

export interface Company {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  type: CompanyType;
  isDefault: boolean;
  accountId: string;
}

