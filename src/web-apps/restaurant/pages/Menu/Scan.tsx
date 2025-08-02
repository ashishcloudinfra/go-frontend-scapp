import { useNavigate } from "react-router";
import { scanMenu } from "../../../../app/actions/restaurant/menu";
import { useAppDispatch } from "../../../../app/hooks";

export default function ScanMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFileChange = async (event: any) => {
    console.log(event);
    try {
      const [err] = await dispatch(scanMenu(event.target.files));
      if (err) {
        console.log('***err', err);
        return;
      }
      navigate('/restaurant/admin/menu/list');
    } catch (error) {
      console.log('***error', error);
    }
  }

  return <div className="flex flex-col gap-4">
    <div>
      <h1 className="text-xl text-gray-700">Upload menu images</h1>
      <p className="text-xs text-gray-500">Upload your menu images and we'll create a menu based on that.</p>
    </div>
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">your menu images</p>
          </div>
          <input id="dropzone-file" multiple={true} type="file" className="hidden" accept="image/*" onChange={(e) => onFileChange(e)} />
      </label>
    </div> 
  </div>
}
