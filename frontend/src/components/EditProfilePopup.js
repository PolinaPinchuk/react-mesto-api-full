import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup(props) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }
    
      function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          job: description,
        });
      }

 return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="edit-form" 
        title="Редактировать профиль" button="Сохранить" onSubmit={handleSubmit}>
            <input id="name" className="popup__input" type="text" required minLength="2" maxLength="40" 
            placeholder="Имя" name="name"  onChange={handleNameChange} value={name || ''}/>
            <span className="name-error popup__input-error"></span>
            <input id="job" className="popup__input" type="text" required minLength="2" maxLength="200" 
            placeholder="О себе" name="job" onChange={handleDescriptionChange} value={description || ''}/>
            <span className="job-error popup__input-error"></span>
    </PopupWithForm>
)
}

export default EditProfilePopup