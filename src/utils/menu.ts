import { MenuItem, Menu } from "../types/Restaurant/MenuItem";

export const groupByCuisine = (items: MenuItem[]) => {
  return items.reduce((result, item) => {
    if (!result[item.categoryName]) {
      result[item.categoryName] = {};
    }
  
    if (!result[item.categoryName][item.menuItemName]) {
      result[item.categoryName][item.menuItemName] = {
        menuItemId: item.menuItemId,
        menuItemDescription: item.menuItemDescription,
        cookingTime: item.cookingTime,
        menuItemPhoto: item.menuItemPhoto,
        isVeg: item.isVeg,
        varieties: [],
      };
    }
  
    result[item.categoryName][item.menuItemName].varieties.push({
      pricingId: item.pricingId,
      varietyType: item.varietyType,
      price: item.price,
    });
  
    return result;
  }, {} as Menu);
};