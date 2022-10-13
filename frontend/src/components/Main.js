import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
const currentUser = React.useContext(CurrentUserContext);     
    return (
        <main className="content">
        <section className="profile">
            <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar}>
                <img className='profile__avatar' src={currentUser.avatar} alt='Фото профиля'/>
            </button>
            <div className="profile__info">
                <div className="profile__container">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
        </section>
                <section className="elements">
        {props.cards && 
          props.cards.map((newCard) => { 
            return ( 
              <Card 
                card={newCard}
                key={newCard._id}
                name={newCard.name}
                link={newCard.link}
                likes={newCard.likes.length}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />)
            })}
        </section>
        </main>     
      )
  }
  
export default Main