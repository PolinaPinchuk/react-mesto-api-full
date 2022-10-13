import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')
  
  function handleNameChange(e) {
    setName(e.target.value); 
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
}, [props.isOpen]); 

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="add-form" 
    title="Новое место" button="Создать">
            <input id="place" className="popup__input" type="text" required minLength="2" maxLength="30" 
            placeholder="Название" name="place" onChange={handleNameChange} value={name  || ''}/>
            <span className="place-error popup__input-error"></span>
            <input id="link" className="popup__input" type="url" required placeholder="Ссылка на картинку" 
            name="link" onChange={handleLinkChange} value={link || ''}/>
            <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup