import { useCallback, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser.id;
  const isLiked = card.likes.some((i) => i._id === currentUser.id);
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? 'element__like-btn_active' : ''
  }`;

  const handleCardClick = useCallback(() => {
    onCardClick(card);
  }, [card, onCardClick]);

  const handleLikeCard = useCallback(() => {
    onCardLike(card);
  }, [card, onCardLike]);

  const handleDeleteClick = useCallback(() => {
    onCardDelete(card);
  }, [card, onCardDelete]);

  return (
    <>
      <img
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
        className="element__image"
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeCard}
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__delete-btn"
          onClick={handleDeleteClick}
        />
      )}
    </>
  );
};
