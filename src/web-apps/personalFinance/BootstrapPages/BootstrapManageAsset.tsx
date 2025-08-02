import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IManageAssetsProps } from "../pages/assets/Manage";
import { AssetItem } from "../../../types/PersonalFinance/Asset";
import { getAllAssets, getAllAssetTypes } from "../../../app/actions/personalFinance/asset";
import { ICashProps } from "../pages/assets/Cash";

export default function BootstrapManageAsset({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IManageAssetsProps | ICashProps> }) {
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
    fetchAssetItems={fetchAssetItems}
  />;
}
