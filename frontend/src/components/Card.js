import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); 

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  `element__delete ${isOwn ? ' ' : 'element__delete_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const isLiked = card.likes.some((i) => i === currentUser._id);
  console.log(card.likes)
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__button ${isLiked ? 'element__button_active' : ' '}`
  );

    function handleClick() {
      onCardClick(card);
    }
    function handleLikeClick() {
      onCardLike(card);
    }
    function handleCardDelete() {
      onCardDelete(card)
    }
  
    return (
        <div className="element">
        <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <div className="element__group">
            <h2 className="element__title">{card.name}</h2>
            <figure className="element__likes">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
                <span className="element__button-count" type="button">{card.likes.length}</span>
            </figure>
        </div>
        <button className={cardDeleteButtonClassName} onClick={handleCardDelete}/>
        </div>
    );
  }
export default Card 