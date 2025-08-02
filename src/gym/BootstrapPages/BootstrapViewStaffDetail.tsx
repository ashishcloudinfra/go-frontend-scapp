import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router";
import { StaffDetail, StaffDetailWithMetadata } from "../../types/Staff";
import { fetchStaffDetailById } from "../../app/actions/gym/staff";
import { IViewStaffDetailsProps } from "../pages/staff/View";

export default function BootstrapViewStaffDetail({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IViewStaffDetailsProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);
  const params = useParams();

  const [staffDetail, setStaffDetail] = useState<StaffDetailWithMetadata | null>();

  const fetchData = async () => {
    const [err, data] = await dispatch(fetchStaffDetailById(params.staffDetailId || ''));
    if (err) {
      return;
    }
    const updatedData = data.data as StaffDetail;
    updatedData.metadata = JSON.parse(updatedData.metadata);
    setStaffDetail(data.data || []);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  if (!staffDetail) return null;

  return <WrappedComponent staffDetail={staffDetail} />;
}
