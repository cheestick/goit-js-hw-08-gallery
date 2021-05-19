import galleryItems from "../gallery-items.js";
// console.log(galleryItems);
const galleryRef = document.querySelector(".js-gallery");
// console.log(galleryRef);
const lightBoxRef = document.querySelector(".js-lightbox");
const overlayLightBoxRef = lightBoxRef.querySelector(".lightbox__overlay");
const closeLightBoxRef = document.querySelector(
  '[data-action="close-lightbox"]'
);
const imageLightBoxRef = lightBoxRef.querySelector(".lightbox__image");
// console.log(imageLightBoxRef);

//console.log(lightBoxRef);
// console.log(closeLightBoxRef);

// // First case CreateElement
// (function createGalleryMarkup() {
//   galleryRef.append(
//     ...galleryItems.map((item) =>
//       createGalleryItem(createImageLink(createImage(item)))
//     )
//   );
// })();

// function createImage(imageData) {
//   const imgEl = document.createElement("img");
//   imgEl.classList.add("gallery__image");
//   imgEl.src = imageData.preview;
//   imgEl.alt = imageData.description;
//   imgEl.dataset.source = imageData.original;
//   return imgEl;
// }

// function createImageLink(imgEl) {
//   const imgLink = document.createElement("a");
//   imgLink.classList.add("gallery__link");
//   imgLink.href = imgEl.dataset.source;
//   imgLink.append(imgEl);
//   return imgLink;
// }

// function createGalleryItem(imgLink) {
//   const galleryItem = document.createElement("li");
//   galleryItem.classList.add("gallery__item");
//   galleryItem.append(imgLink);
//   return galleryItem;
// }

// second case InsertAdjacentHTML
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
  // console.log(src, alt);
  // console.log(e.target);
  imageLightBoxRef.src = source;
  imageLightBoxRef.alt = alt;

  lightBoxRef.classList.add("is-open");
  lightBoxRef.addEventListener("click", closeLightBoxHandler);
}

function closeLightBoxHandler({ target: { className } }) {
  if (className === "lightbox__overlay" || className === "lightbox__button") {
    lightBoxRef.classList.remove(`is-open`);
    imageLightBoxRef.src = "";
    imageLightBoxRef.alt = "";
  }
}
