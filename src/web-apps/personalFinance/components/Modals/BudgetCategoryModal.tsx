import Modal from "../Modal";

interface IBudgetCategoryModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function BudgetCategoryModal(props: IBudgetCategoryModalProps) {
  return (
    <Modal
      title="Add new category Item"
      showFooter={false}
      children={props.children}
      onClose={props.onClose}
    />
  )
}
