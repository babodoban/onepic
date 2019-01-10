const UNSPLASH_API_KEY =
  "918700288c4f8c1d0a72ec407f5f9a8ef30ebd20cfd9288a3ab70400cd07d81f";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=portrait&orientation=portrait`;
const pic_left = document.querySelector(".pic_left"),
	pic_right = document.querySelector(".pic_right");

function loadPicture() {
  const savedImage = localStorage.getItem("pic");
  if (savedImage === null) {
    getPicture();
  } else {
    const parsedImage = JSON.parse(savedImage);
      pic_left.style.backgroundImage = `url(${
        parsedImage.url
      })`;
    }
    return;
  }
  

function getPicture() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const image = json;
      if (image.urls && image.urls.full) {
        const fullUrl = image.urls.full;
        savePicture(fullUrl);
      } else {
        getPicture();
      }
    });
  return;
}

function savePicture(imageUrl) {
  const savedImage = localStorage.getItem("pic");
  if (savedImage !== null) {
    localStorage.removeItem("pic");
  }
  const imageObject = {
    url: imageUrl
  };
  localStorage.setItem("pic", JSON.stringify(imageObject));
  loadPicture();
  return;
}

function initApp() {
  getPicture();
  loadPicture();
  return;
}

initApp();