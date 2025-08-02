
import { useState, useEffect } from "react";
import { getAllAssetTypes, getAllAssets } from "../../../../app/actions/personalFinance/asset";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AssetItem } from "../../../../types/PersonalFinance/Asset";
import { IMutualFundProps } from "../../pages/assets/MutualFund";

export interface IMutualNameAndCode {
  schemeCode: number;
  schemeName: string;
}

export default function BootstrapMutualFund({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IMutualFundProps> }) {
  const dispatch = useAppDispatch();
  const tokenData = useAppSelector(s => s.token.data);

  const [assetTypes, setAssetTypes] = useState<string[]>([]);
  const [assetItems, setAssetItems] = useState<AssetItem[]>([]);
  const [mutualFundNames, setMutualFundNames] = useState<IMutualNameAndCode[]>([]);

  const fetchAssetTypes = async () => {
    const [err, data] = await dispatch(getAllAssetTypes());
    if (err) {
      return;
    }
    setAssetTypes(data || []);
  };

  const fetchAssetItems = async () => {
    const [err, data] = await dispatch(getAllAssets());
    if (err) {
      return;
    }
    setAssetItems(data || []);
  };

  const fetchAllMutualFundsName = async () => {
    const response = await fetch('https://api.mfapi.in/mf');
    const result = await response.json();
    setMutualFundNames(result);
  }

  const fetchAllData = async () => {
    fetchAssetItems();
    fetchAssetTypes();
    fetchAllMutualFundsName();
  }

  useEffect(() => {
    if (!tokenData) {
      return;
    }
    fetchAllData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData]);

  return <WrappedComponent
    assetTypes={assetTypes}
    assetItems={assetItems}
    mutualFundNames={mutualFundNames}
    fetchAssetItems={fetchAssetItems}
  />;
}
