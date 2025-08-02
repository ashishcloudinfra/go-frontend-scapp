export interface AssetTypeReqBody {
  name: string;
}

export interface AssetType {
  name: string;
}

export interface AssetItemReqBody {
  name: string;
  assetType: string;
  code?: string;
  ownerName?: string;
  avgBuyValue?: number;
  currentValue?: number;
  totalUnits?: number;
}

export interface AssetItem {
  Id: string;
  Name: string;
  AssetType: string;
  Code?: string;
  OwnerName?: string;
  AvgBuyValue?: number;
  CurrentValue?: number;
  TotalUnits?: number;
  IamId?: string;
}

export type AssetTypeList = 'Cash' | 'Gold' | 'Silver' | 'Mutual fund' | 'Stock' | 'ETF' | 'RealEstate' | 'FixedDeposit' | 'EPF' | 'NPS' | 'default';
