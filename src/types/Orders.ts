export enum OrderStatus {
  OutOfStock = 'OutOfStock',
  New = 'New',
  Accepted = 'Accepted',
  Preparing = 'Preparing',
  Completed = 'Completed',
  Paid = 'Paid',
};

export interface OrderItemRequestBody {
  quantity: number;
  menuItemPricingId: string;
}

export interface OrderRequestBody {
  tableNumber: string;
  isDineIn: boolean;
  status: keyof typeof OrderStatus;
  phone: string;
  email: string;
  items: OrderItemRequestBody[];
  companyId: string;
}

export interface AdminOrder {
  OrderId: string;
  OrderItemId: string;
  OrderNumber: number;
  Status: keyof typeof OrderStatus;
  MenuitemName: string;
  VarietyType: string;
  IsVeg: boolean;
  Quantity: number;
  TableNumber: string;
}

