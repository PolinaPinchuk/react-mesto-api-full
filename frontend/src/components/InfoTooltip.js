function InfoTooltip({name, isOpen, img, title, onClose}) {
  return (
    <section className={`popup ${name} ${isOpen && 'popup_opened'}`} >
      <div className="popup__container-infoToolTip">
        <img className="popup__notify-success" src={img} alt={title}></img>
        <h2 className="popup__notify-title">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;