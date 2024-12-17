const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__new-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfile = document.querySelector("#edit-modal");
const newPost = document.querySelector("#new-post-modal");
const previewImg = document.querySelector("#preview-modal");
const previewModalImgElement = previewImg.querySelector(".modal__image");
const previewModalCaptionElement = previewImg.querySelector(".modal__caption");

const editModalCloseButton = editProfile.querySelector(".modal__close-btn");
const newPostModalCloseButton = newPost.querySelector(".modal__close-btn");
const previewImgModalCloseButton =
  previewImg.querySelector(".modal__close-btn");

const editNameInput = editProfile.querySelector("#profile-name-input");
const editDescriptionInput = editProfile.querySelector(
  "#profile-description-input"
);
const imgLinkInput = newPost.querySelector("#img-link-input");
const captionInput = newPost.querySelector("#img-caption-input");
const editProfileForm = editProfile.querySelector(".modal__form");
const newPostForm = newPost.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".gallery__cards");

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
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageElement.addEventListener("click", () => {
    openModal(previewImg);
    previewModalImgElement.src = data.link;
    previewModalCaptionElement.textContent = data.name;
    previewModalImgElement.alt = data.name;
  });

  return cardElement;
}

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

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

function handleProfileFormSubmit(evt) {
  profileName.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  closeModal(editProfile);
  evt.preventDefault();
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: captionInput.value, link: imgLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  const buttonElement = evt.target.querySelector(".modal__submit-btn");
  disableButton(buttonElement, settings);

  closeModal(newPost);
  evt.target.reset();
}

profileEditButton.addEventListener("click", () => {
  openModal(editProfile);
  editNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});

newPostButton.addEventListener("click", () => {
  openModal(newPost);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
