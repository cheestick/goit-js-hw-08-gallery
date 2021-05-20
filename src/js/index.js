import galleryItems from "../gallery-items.js";
const galleryRef = document.querySelector(".js-gallery");
const lightBoxRef = document.querySelector(".js-lightbox");
const overlayLightBoxRef = lightBoxRef.querySelector(".lightbox__overlay");
const closeLightBoxRef = document.querySelector(
  '[data-action="close-lightbox"]'
);
const imageLightBoxRef = lightBoxRef.querySelector(".lightbox__image");

(function createGalleryMarkup() {
  galleryRef.insertAdjacentHTML(
    "afterbegin",
    galleryItems
      .map(
        ({ preview, original, description }) =>
          `<li class="gallery__item">
            <a
                class="gallery__link"
                href=${original}>
                <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt="${description}"
                />
            </a>
            </li>`
      )
      .join("")
  );
})();

galleryRef.addEventListener(`click`, imageClickHandler);

function imageClickHandler(e) {
  if (e.target.nodeName !== `IMG`) return;
  e.preventDefault();
  const {
    dataset: { source },
    alt,
  } = e.target;

  setModalLargePicPreview(source, alt);

  lightBoxRef.classList.add("is-open");
  addModalControlsHandlers();
}

function closeLightBoxHandler({ target }) {
  const { classList } = target;
  if (
    !(
      classList.contains("lightbox__overlay") ||
      classList.contains("lightbox__button")
    )
  )
    return;
  closeLargePicModal();
}

function closeByEscHandler(e) {
  if (e.code !== "Escape") return;
  closeLargePicModal();
}

function previewPicByArrowsHandler(e) {
  if (!(e.code === "ArrowLeft" || e.code === "ArrowRight")) return;
  switch (e.code) {
    case "ArrowLeft":
      break;
    case "ArrowRight":
      break;
    default:
      console.log("somethigh wrong with navigation by arrows!");
  }
}

function closeLargePicModal() {
  if (!lightBoxRef.classList.contains("is-open")) return;
  lightBoxRef.classList.remove("is-open");
  clearModalLargePicPreview();
  removeModalControlsHandlers();
}

function setModalLargePicPreview(source, alt) {
  imageLightBoxRef.src = source;
  imageLightBoxRef.alt = alt;
}
function clearModalLargePicPreview() {
  imageLightBoxRef.src = "";
  imageLightBoxRef.alt = "";
}

function addModalControlsHandlers() {
  if (!lightBoxRef.classList.contains("is-open")) return;
  lightBoxRef.addEventListener("click", closeLightBoxHandler);
  window.addEventListener("keyup", closeByEscHandler);
  window.addEventListener("keyup", previewPicByArrowsHandler);
}

function removeModalControlsHandlers() {
  lightBoxRef.removeEventListener("click", closeLightBoxHandler);
  window.removeEventListener("keyup", closeByEscHandler);
  window.removeEventListener("keyup", previewPicByArrowsHandler);
}
