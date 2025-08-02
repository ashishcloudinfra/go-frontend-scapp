import { RotatingLines } from "react-loader-spinner";
import { isPageLoading } from "../../app/features/loading"
import { useAppSelector } from "../../app/hooks"

export default function PageLoader() {
  const loading = useAppSelector(s => s.loading);

  const isLoading = isPageLoading(loading);

  if (!isLoading) return null;

  return (  
    <div className="min-h-screen w-screen absolute grid place-items-center bg-gray-400 opacity-70 z-50">
      <div className="relative -top-32">
        <RotatingLines
          visible={true}
          width="96"
          strokeWidth="5"
          strokeColor="#04102B"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </div>
  )
}
