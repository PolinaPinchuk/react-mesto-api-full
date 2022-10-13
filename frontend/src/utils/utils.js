// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export const validationStructure = {
    formSelector: ".popup__content",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    //кнопка отключена
    inactiveButtonClass: "popup__save_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};

export const templateSelector = "#element-template";
export const cardSelectorDefault = ".elements";

export const initialCards = [
    {
        place: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        place: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        place: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        place: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        place: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        place: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];