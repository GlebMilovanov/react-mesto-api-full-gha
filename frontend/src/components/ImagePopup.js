import { usePopupClose } from '../hooks/usePopupClose';

export const ImagePopup = ({ card, onClose }) => {
  usePopupClose(card, onClose);

  return (
    card && (
      <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
        <figure className="popup__image-container">
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-btn"
            onClick={onClose}
          ></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-name">{card.name}</figcaption>
        </figure>
      </div>
    )
  );
};
