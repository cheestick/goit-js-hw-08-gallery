import galleryItems from "../gallery-items.js";
const galleryRef = document.querySelector(".js-gallery");
const lightBoxRef = document.querySelector(".js-lightbox");
const imageLightBoxRef = lightBoxRef.querySelector(".lightbox__image");
let currentLargePicIndex = null;

(function createGalleryMarkup() {
  galleryRef.insertAdjacentHTML(
    "afterbegin",
    galleryItems
      .map(
        ({ preview, original, description }, index) =>
          `<li class="gallery__item">
            <a
                class="gallery__link"
                href=${original}>
                <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                data-preview-index='${index + 1}'
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
    dataset: { source, previewIndex },
    alt,
  } = e.target;

  setModalLargePicPreview(source, alt, previewIndex);

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
      previousPic();
      break;
    case "ArrowRight":
      nextPic();
      break;
    default:
      console.log("somethigh wrong with navigation by arrows!");
  }
}

function nextPic() {
  const nextImgRef = galleryRef.querySelector(
    `[data-preview-index='${Number(currentLargePicIndex) + 1}']`
  );
  if (!nextImgRef) return;
  const {
    dataset: { source, previewIndex },
    alt,
  } = nextImgRef;
  setModalLargePicPreview(source, alt, previewIndex);
}

function previousPic() {
  const prevImgRef = galleryRef.querySelector(
    `[data-preview-index='${Number(currentLargePicIndex) - 1}']`
  );
  if (!prevImgRef) return;
  const {
    dataset: { source, previewIndex },
    alt,
  } = prevImgRef;
  setModalLargePicPreview(source, alt, previewIndex);
}

function closeLargePicModal() {
  if (!lightBoxRef.classList.contains("is-open")) return;
  lightBoxRef.classList.remove("is-open");
  clearModalLargePicPreview();
  removeModalControlsHandlers();
}

function setModalLargePicPreview(source, alt, index) {
  imageLightBoxRef.src = source;
  imageLightBoxRef.alt = alt;
  imageLightBoxRef.dataset.currentIndex = index;
  currentLargePicIndex = index;
}
function clearModalLargePicPreview() {
  imageLightBoxRef.src = "";
  imageLightBoxRef.alt = "";
  imageLightBoxRef.dataset.currentIndex = "";
  currentLargePicIndex = null;
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
