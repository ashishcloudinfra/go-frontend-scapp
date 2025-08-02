import { AssetItem, AssetTypeList } from "../../../types/PersonalFinance/Asset";

export const AssetIcon: Record<AssetTypeList, React.ReactNode> = {
  'Cash': <img src="/images/cash.png" className="p-4" />,
  'Gold': <img src="/images/gold.png" className="p-4" />,
  'Silver': <img src="/images/silver.png" className="p-4" />,
  'Mutual fund': <img src="/images/mutualFund.png" className="p-4" />,
  'Stock': <img src="/images/stock.png" className="p-4" />,
  'ETF': <img src="/images/etf.png" className="p-4" />,
  'RealEstate': <img src="/images/realestate.png" className="p-4" />,
  'FixedDeposit': <img src="/images/fd.png" className="p-4" />,
  'EPF': <img src="/images/epf.png" className="p-4" />,
  'NPS': <img src="/images/nps.png" className="p-4" />,
  'default': <img src="/images/default.png" className="p-4" />
}

export function calculateTotalNetworth(assets: AssetItem[]) {
  let totalNetworth = 0;

  assets.forEach(asset => {
    if (['Stock', 'Mutual fund', 'ETF'].includes(asset.AssetType)) {
      totalNetworth += ((asset.CurrentValue || 0)*(asset.TotalUnits || 0))
    }
    if (['Gold', 'Silver'].includes(asset.AssetType)) {
      totalNetworth += ((asset.AvgBuyValue || 0)*(asset.TotalUnits || 0))
    }
    if (['FixedDeposit', 'NPS', 'EPF', 'Cash'].includes(asset.AssetType)) {
      totalNetworth += (asset.CurrentValue || 0)
    }
  })

  return totalNetworth;
}
