import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Card } from './Card';
import { useContext } from 'react';

export const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <button
            className="profile__avatar-btn"
            onClick={onEditAvatar}
          ></button>
          <img
            src={currentUser && currentUser.avatar}
            alt="фото профиля"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser && currentUser.name}</h1>
          <p className="profile__about">{currentUser && currentUser.about}</p>
          <button
            type="button"
            aria-label="Редактировать"
            className="profile__edit-btn"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-btn"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (
            <li className="element" key={card._id}>
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
