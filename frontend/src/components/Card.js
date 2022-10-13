import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext); 

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  `element__delete ${isOwn ? ' ' : 'element__delete_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__button ${isLiked ? 'element__button_active' : ' '}`
  );

    function handleClick() {
      props.onCardClick(props.card);
    }
    function handleLikeClick() {
      props.onCardLike(props.card);
    }
    function handleCardDelete() {
      props.onCardDelete(props.card)
    }
  
    return (
        <div className="element">
        <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
        <div className="element__group">
            <h2 className="element__title">{props.name}</h2>
            <figure className="element__likes">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
                <span className="element__button-count" type="button">{props.likes}</span>
            </figure>
        </div>
        <button className={cardDeleteButtonClassName} onClick={handleCardDelete}/>
        </div>
    );
  }
export default Card 