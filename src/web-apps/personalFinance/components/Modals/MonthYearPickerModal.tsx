import Modal from "../Modal";

interface IMonthYearPickerModalProps {
  title?: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

export default function MonthYearPickerModal(props: IMonthYearPickerModalProps) {
  return (
    <Modal
      title={props.title || "Select month and year"}
      description={props.description || ''}
      showFooter={false}
      children={props.children}
      onClose={props.onClose}
    />
  )
}
