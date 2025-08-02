export interface MembershipPlan {
  id: string;
  name: string;
  price: number; // NUMERIC(10, 2) maps to number
  duration: 'monthly' | 'quarterly' | 'annually'; // Enums in the CHECK constraint
  discount?: string; // Nullable field
  features: string[]; // TEXT[] maps to string[]
  status: 'active' | 'inactive'; // Enums in the CHECK constraint
  cancellationPolicy: string[]; // TEXT[] maps to string[]
  companyId: number; // Foreign key
}
