function ImagePopup (props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <button className="popup__close" type="button"  onClick={props.onClose}/>
                <img  className="popup__image" src={props.card.link} alt={props.card.name}/>
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </section>
    );
}
export default ImagePopup