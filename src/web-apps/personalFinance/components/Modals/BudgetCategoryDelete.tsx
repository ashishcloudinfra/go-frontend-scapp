import Modal from "../Modal";

interface IBudgetCategoryModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

export default function BudgetCategoryDelete(props: IBudgetCategoryModalProps) {
  return (
    <Modal
      title="Are you sure?"
      description="Are you sure you want to delete this category?"
      showFooter={true}
      onClose={props.onClose}
      onSecondaryBtnClickHandler={props.onClose}
      onPrimaryBtnClickHandler={props.onSubmit}
    />
  )
}
