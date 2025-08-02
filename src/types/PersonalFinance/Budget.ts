export type CategoryType = 'Income' | 'Expense' | 'Investment' | 'Saving' | 'Other';

export interface BudgetCategoryType {
  id: string;
  type: CategoryType;
  bgColor: string;
  textColor: string;
}

export interface CopyBudgetReqBody {
  oldMonth: number;
  oldYear: number;
  currentMonth: number;
  currentYear: number;
}

export interface BudgetCategoryReqBody {
  categoryName: string;
  categoryDescription: string;
  month: number;
  year: number;
  parentId: string;
  categoryTypeId: string;
}

export interface BudgetItemReqBody {
  categoryId: string;
  itemName: string;
  description: string;
  allocatedAmount: number;
  actualAmount: number;
  currencyCode: string;
  status: 'active' | 'inactive';
  month: number;
  year: number;
}

export interface BudgetCategory {
  id: string;
  categoryName: string;
  categoryDescription: string;
  month: number;
  year: number;
  parentId: string;
  categoryTypeId: string;
}

export interface BudgetItem {
  id: string;
  categoryId: string;
  itemName: string;
  description: string;
  allocatedAmount: number;
  actualAmount: number;
  currencyCode: string;
  status: string;
  month: number;
  year: number;
}

export interface BudgetCategoryTypeStats {
  category_type: string;
  bg_color: string;
  text_color: string;
  month: number;
  year: number;
  item_count: number;
  total_allocated_amount: number;
  total_actual_amount: number;
  currency_code: string;
  categories: string;
}

export interface RawUserStats {
  type: string;
  categoryName: string;
  itemName: string;
  actualAmount: number;  // float64 in Go maps to number in TypeScript
  month: number;        // int in Go maps to number in TypeScript
  year: number;         // int in Go maps to number in TypeScript
}
