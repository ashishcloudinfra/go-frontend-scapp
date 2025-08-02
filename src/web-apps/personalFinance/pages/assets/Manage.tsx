import { useNavigate } from "react-router";
import { TbReload } from "react-icons/tb";
import PageHeading from "../../../../components/PageHeading";
import { AssetItem, AssetTypeList } from "../../../../types/PersonalFinance/Asset";
import { AssetIcon } from "../../helpers/asset";
import { refreshPortfolio } from "../../../../app/actions/personalFinance/asset";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { isComponentLoading } from "../../../../app/features/loading";

export interface IManageAssetsProps {
  assetTypes: string[];
  assetItems: AssetItem[];
  fetchAssetItems: () => void;
}

export default function ManageAssets(props: IManageAssetsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);

  const isRefreshingPortfolio = isComponentLoading(state, 'REFRESH_PORTFOLIO');

  const refreshPortfolioClickHandler = () => {
    dispatch(refreshPortfolio())
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <PageHeading
          title="Assets"
          description="Manage your assets"
        />
      </div>

      <div className="flex gap-3">
        <button
          className="w-fit flex gap-1 bg-primary text-sm text-gray-50 rounded-md px-3 py-2 cursor-pointer scale-light disabled:bg-gray-500 disabled:pointer-events-none"
          disabled={isRefreshingPortfolio}
          onClick={refreshPortfolioClickHandler}
        >
          <TbReload className="relative top-1" />
          Refresh portfolio
        </button>
        {isRefreshingPortfolio && <span>Refreshing...</span>}
      </div>

      {!props.assetTypes.length && <div>
        <h2 className="text-xl text-gray-600">Coming soon. Stay tuned</h2>
      </div>}
      {!!props.assetTypes.length && <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {props.assetTypes.map((assetType) => (
              <div
                key={assetType}
                className="flex flex-col justify-between gap-2 border-2 border-gray-300 w-[8rem] p-3 rounded-md items-center scale-light cursor-pointer"
                onClick={() => navigate(`/personalfinance/asset/${assetType.toLowerCase()}`)}
              >
                <div>{AssetIcon[assetType as AssetTypeList]}</div>
                <span className="text-gray-600 text-sm">{assetType}</span>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </div>
  )
}
