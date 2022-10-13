import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth'
import success from '../images/success.png'
import unSuccess from '../images/unSuccess.png'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState();
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [message, setMessage] = React.useState({ img: '', text: '' })

  React.useEffect(() => {

    checkToken();
    if (loggedIn) {

      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([user, initCards]) => {
          setCards(initCards)
          setCurrentUser(user)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)

    setTooltipStatus();
    setMessage({img: '', text: ''})
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((item) => item !== card))
    })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(userItem) {
    api.editProfile(userItem)
      .then((item) => {
        setCurrentUser(item)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(userAvatar) {
    api.editAvatar(userAvatar)
      .then((item) => {
        setCurrentUser(item)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(dataNewCard) {
    api.addCard(dataNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({});
  }

  function handleRegister (password, email) {
    auth.register(password, email)
      .then((result) => {
        setEmail(result.data.email)
        history.push('/sign-in')
        setMessage({ img: success, text: 'Вы успешно зарегистрировались!' })
      })
      .catch(() => setMessage({ img: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setTooltipStatus(true))
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        setEmail(email)
        localStorage.setItem('jwt', data.token);
        checkToken();
      })
      .catch((error) => {
        console.log(error);
        setMessage({ img: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
        setTooltipStatus(true)
      });
  }

  React.useEffect(() => {
    checkToken()
  }, [])

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
      history.push('/')
      auth.getCheckToken(jwt)
        .then((user) => {
          setEmail(user.data.email)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header onSignOut={handleLogout} email={email}/>

            <Switch>
            <Route path="/sign-up">
                <Register
                  isOpen={isEditProfilePopupOpen}
                  onRegister={handleRegister}
                  tooltipStatus={tooltipStatus}
                />
              </Route>

              <Route path="/sign-in">
                <Login
                  isOpen={isEditProfilePopupOpen}
                  onAuth={handleLogin}
                />
              </Route>

              <ProtectedRoute
                exact path="/"
                component={Main}
                loggedIn={loggedIn}

                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}>
              </ProtectedRoute>           

            </Switch>

            <InfoTooltip isOpen={tooltipStatus} onClose={closeAllPopups}
              name='infoToolTip'
              img={message.img}
              title={message.text}
            />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <PopupWithForm name="add-form" onClose={closeAllPopups} title="Вы уверены?" button="Да">
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
            <Footer />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
