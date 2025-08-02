import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useParams } from "react-router";
import { IEditStaffDetailProps } from "../../pages/staff/Edit";
import { StaffDetail, StaffDetailWithMetadata } from "../../../types/Staff";
import { fetchStaffDetailById } from "../../../app/actions/gym/staff";

export default function BootstrapEditStaffDetail({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IEditStaffDetailProps> }) {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [staffDetail, setStaffDetail] = useState<StaffDetailWithMetadata | null>(null);

  const fetchData = async () => {
    const [err, data] = await dispatch(fetchStaffDetailById(params.staffDetailId || ''));
    if (err) {
      return;
    }
    const updatedData = data.data as StaffDetail;
    updatedData.metadata = JSON.parse(updatedData.metadata);
    setStaffDetail(updatedData as unknown as StaffDetailWithMetadata);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!staffDetail) return null;

  return <WrappedComponent staffDetail={staffDetail} />;
}
