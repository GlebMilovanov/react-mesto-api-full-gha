import { usePopupClose } from '../hooks/usePopupClose';

export const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
  isValid = true,
}) => {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__submit-btn ${
              !isValid ? 'popup__submit-btn_disabled' : ''
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
