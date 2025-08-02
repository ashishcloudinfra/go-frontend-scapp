import Modal from "../Modal";

interface IBudgetEditCategoryModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function BudgetEditCategoryModal(props: IBudgetEditCategoryModalProps) {
  return (
    <Modal
      title="Edit category Item"
      showFooter={false}
      children={props.children}
      onClose={props.onClose}
    />
  )
}
