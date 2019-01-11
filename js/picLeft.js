const UNSPLASH_LEFT_API_KEY =
  "918700288c4f8c1d0a72ec407f5f9a8ef30ebd20cfd9288a3ab70400cd07d81f";
const UNSPLASH_LEFT_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_LEFT_API_KEY}&query=portrait&orientation=portrait`;

const pic_left = document.querySelector(".pic_left");

function loadLeftPicture() {
  const savedLeftImage = localStorage.getItem("pic_left");
  if (savedLeftImage === null) {
    getLeftPicture();
  } else {
    const parsedLeftImage = JSON.parse(savedLeftImage);
      pic_left.style.backgroundImage = `url(${
        parsedLeftImage.url
      })`;
    }
    return;
  }

function saveLeftPicture(imageLeftUrl) {
  const savedLeftImage = localStorage.getItem("pic_left");
  if (savedLeftImage !== null) {
    localStorage.removeItem("pic_left");
  }
  const imageLeftObject = {
    url: imageLeftUrl
  };
  localStorage.setItem("pic_left", JSON.stringify(imageLeftObject));
  loadLeftPicture();
  return;
}

function getLeftPicture() {
  fetch(UNSPLASH_LEFT_URL)
    .then(responseLeft => responseLeft.json())
    .then(jsonLeft => {
      const leftImage = jsonLeft;
      if (leftImage.urls && leftImage.urls.full) {
        const fullUrl = leftImage.urls.full;
        saveLeftPicture(fullUrl);
      } else {
        getLeftPicture();
      }
    });
  return;
}

function initLeftApp() {
  getLeftPicture();
  // loadLeftPicture();
  return;
}

initLeftApp();