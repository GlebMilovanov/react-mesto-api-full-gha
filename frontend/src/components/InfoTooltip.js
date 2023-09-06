import successImage from '../images/success.svg';
import failureImage from '../images/failure.svg';

export const InfoTooltip = ({ isOpen, onClose, isError }) => {
  return (
    <div
      className={`popup popup popup_type_info-tooltip ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__info-tooltip-container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        {isError ? (
          <>
            <img
              className="popup__info-tooltip-image"
              alt="неудачная регистрация"
              src={failureImage}
            />
            <p className="popup__info-tooltip-response">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        ) : (
          <>
            <img
              className="popup__info-tooltip-image"
              alt="удачная регистрация"
              src={successImage}
            />
            <p className="popup__info-tooltip-response">
              Вы успешно зарегистрировались!
            </p>
          </>
        )}
      </div>
    </div>
  );
};
