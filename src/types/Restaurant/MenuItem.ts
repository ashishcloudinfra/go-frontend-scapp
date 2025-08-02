export interface MenuItemRequestBody {
  name: string;
  description: string;
  photo?: string;
  isVeg: boolean; // veg, non-veg
  category: string; // indian, italian, starters
  cookingTime: string;
  addOns?: Array<{
    id?: string;
    categoryId?: string;
    category: string;
    name: string;
    description: string;
    isVeg: boolean;
    price: string;
  }>;
  varieties: {
    id?: string;
    name: string;
    price: string;
  }[];
}

export interface MenuItem {
  menuItemId: string;
  menuItemName: string;
  menuItemDescription: string;
  cookingTime: string;
  menuItemPhoto: string;
  isVeg: boolean;
  categoryName: string;
  pricingId: string;
  varietyType: string;
  price: string;
};

export interface MenuItemWithQuantity {
  Name?: string;
  Description?: string;
  Quantity: number;
  MenuitemName: string;
  VarietyType: string;
  Price: string;
  Photo: string;
  IsVeg: boolean;
}

export type Menu = {
  [category: string]: {
    [itemName: string]: MenuItemWithVariety;
  };
};

export type MenuItemWithVariety = {
  menuItemId: string;
  menuItemDescription: string;
  cookingTime: string;
  menuItemPhoto: string;
  isVeg: boolean;
  varieties: Variety[];
};

export type Variety = {
  pricingId: string;
  varietyType: string;
  price: string;
};
