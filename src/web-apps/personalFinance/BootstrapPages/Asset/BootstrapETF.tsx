
import { useState, useEffect } from "react";
import { getAllAssetTypes, getAllAssets } from "../../../../app/actions/personalFinance/asset";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AssetItem } from "../../../../types/PersonalFinance/Asset";
import etfs from './etfs.json'
import { IETFProps } from "../../pages/assets/ETF";

export interface IETFNameAndCode {
  symbol: string;
  name: string;
}

export default function BootstrapETF({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IETFProps> }) {
  const dispatch = useAppDispatch();
  const tokenData = useAppSelector(s => s.token.data);

  const [assetTypes, setAssetTypes] = useState<string[]>([]);
  const [assetItems, setAssetItems] = useState<AssetItem[]>([]);

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

  const fetchAllData = async () => {
    fetchAssetItems();
    fetchAssetTypes();
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
    etfs={etfs}
    fetchAssetItems={fetchAssetItems}
  />;
}
