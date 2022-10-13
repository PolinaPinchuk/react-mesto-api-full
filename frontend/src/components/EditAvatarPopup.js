import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
  avatarRef.current.value = ''
  }, [props.isOpen]);
  
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="add-form" title="Обновить аватар" 
    button="Сохранить" onSubmit={handleSubmit}>
                    <input type="url" placeholder="Ссылка на аватар" className="popup__input" required 
                    id="avatar" name="avatar" autoComplete="off" ref={avatarRef}/>
                    <span className="avatar-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup