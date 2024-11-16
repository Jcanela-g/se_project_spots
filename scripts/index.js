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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfile = document.querySelector("#edit-modal");
const modalCloseButton = editProfile.querySelector(".modal__close-btn");
const editNameInput = editProfile.querySelector("#profile-name-input");
const editDescriptionInput = editProfile.querySelector(
  "#profile-description-input"
);
const editProfileForm = editProfile.querySelector(".modal__form");

function openModal() {
  editNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  editProfile.classList.add("modal_open");
}
function closeModal() {
  editProfile.classList.remove("modal_open");
}
function profileFormSubmit(evt) {
  profileName.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  closeModal();
  evt.preventDefault();
}

profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
editProfileForm.addEventListener("submit", profileFormSubmit);
