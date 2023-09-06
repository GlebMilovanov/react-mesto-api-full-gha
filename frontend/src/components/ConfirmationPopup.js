import { PopupWithForm } from './PopupWithForm';
import { Loader } from './Loader';

export const ConfirmationPopup = ({ card, onClose, onConfirm, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(card);
    onClose();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      isOpen={card}
      onSubmit={handleSubmit}
      onClose={onClose}
      buttonText={isLoading ? <Loader /> : 'Да'}
    >
    </PopupWithForm>
  );
};
