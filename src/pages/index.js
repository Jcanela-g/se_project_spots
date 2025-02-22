import "./index.css";
import {
  resetValidation,
  enableValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "833151b4-3f94-4865-a6a7-7fdb64fe3173",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });

    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch(console.error);

const profileEditButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__new-btn");
const cancelButton = document.querySelector(".modal__cancel-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const editProfile = document.querySelector("#edit-modal");
const newPost = document.querySelector("#new-post-modal");
const confirmDeletion = document.querySelector("#delete-confirm-modal");
const previewImg = document.querySelector("#preview-modal");
const previewModalImgElement = previewImg.querySelector(".modal__image");
const previewModalCaptionElement = previewImg.querySelector(".modal__caption");

const editNameInput = editProfile.querySelector("#profile-name-input");
const editDescriptionInput = editProfile.querySelector(
  "#profile-description-input"
);
const imgLinkInput = newPost.querySelector("#img-link-input");
const captionInput = newPost.querySelector("#img-caption-input");
const editProfileForm = editProfile.querySelector(".modal__form");
const newPostForm = newPost.querySelector(".modal__form");
const deleteForm = confirmDeletion.querySelector("#deleteForm");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".gallery__cards");

let selectedCard;
let selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__description");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;

    openModal(confirmDeletion);
  }

  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImageElement.addEventListener("click", () => {
    openModal(previewImg);
    previewModalImgElement.src = data.link;
    previewModalCaptionElement.textContent = data.name;
    previewModalImgElement.alt = data.name;
  });

  return cardElement;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId) // pass the ID of the api function
    .then(() => {
      if (selectedCard) {
        selectedCard.remove();
        selectedCard = null;
      }
      closeModal(confirmDeletion);
    })
    .catch(console.error);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_open");
    closeModal(activePopup);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal_open")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_open");
  modal.addEventListener("mousedown", handleOverlay);
  document.addEventListener("keyup", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  modal.removeEventListener("mousedown", handleOverlay);
  document.removeEventListener("keyup", handleEscape);
}

cancelButton.addEventListener("click", () => {
  closeModal(confirmDeletion);
});

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

function handleSubmitBtn(evt) {
  const buttonElement = evt.target.querySelector(".modal__submit-btn");
  disableButton(buttonElement, settings);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editNameInput.value,
      about: editDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      handleSubmitBtn(evt);

      closeModal(editProfile);
    })
    .catch(console.error);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  api
    .addNewCard({
      name: captionInput.value,
      link: imgLinkInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);

      handleSubmitBtn(evt);

      closeModal(newPost);
      evt.target.reset();
    })
    .catch(console.error);
}

profileEditButton.addEventListener("click", () => {
  editNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfile);
});

newPostButton.addEventListener("click", () => {
  openModal(newPost);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(settings);
