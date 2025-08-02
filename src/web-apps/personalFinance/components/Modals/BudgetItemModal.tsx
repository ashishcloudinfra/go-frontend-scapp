import Modal from "../Modal";

interface IBudgetCategoryModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function BudgetItemModal(props: IBudgetCategoryModalProps) {
  return (
    <Modal
      title="Add new budget item"
      showFooter={false}
      children={props.children}
      onClose={props.onClose}
    />
  )
}
