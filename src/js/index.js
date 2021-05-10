import galleryItems from "../gallery-items.js";
// console.log(galleryItems);
const galleryRef = document.querySelector(".js-gallery");
// console.log(galleryRef);

// // First case
// (function createGalleryMarkup() {
//   galleryRef.append(
//     ...galleryItems.map((item) =>
//       createGalleryItem(createImageLink(createImage(item)))
//     )
//   );
// })();

function createImage(imageData) {
  const imgEl = document.createElement("img");
  imgEl.classList.add("gallery__image");
  imgEl.src = imageData.preview;
  imgEl.alt = imageData.description;
  imgEl.dataset.source = imageData.original;
  return imgEl;
}

function createImageLink(imgEl) {
  const imgLink = document.createElement("a");
  imgLink.classList.add("gallery__link");
  imgLink.href = imgEl.dataset.source;
  imgLink.append(imgEl);
  return imgLink;
}

function createGalleryItem(imgLink) {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");
  galleryItem.append(imgLink);
  return galleryItem;
}

// second case
(function createGalleryMarkup() {
  galleryRef.insertAdjacentHTML(
    "afterbegin",
    galleryItems.map((item) => createGalleryItemMurkup(item)).join("")
  );
})();

function createGalleryItemMurkup({ preview, original, description }) {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
}
