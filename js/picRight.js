const UNSPLASH_RIGHT_API_KEY =
  "918700288c4f8c1d0a72ec407f5f9a8ef30ebd20cfd9288a3ab70400cd07d81f";
const UNSPLASH_RIGHT_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_RIGHT_API_KEY}&query=portrait&orientation=portrait`;

const pic_right = document.querySelector(".pic_right");

function loadRightPicture() {
  const savedRightImage = localStorage.getItem("pic_right");
  if (savedRightImage === null) {
    getRightPicture();
  } else {
    const parsedRightImage = JSON.parse(savedRightImage);
      pic_right.style.backgroundImage = `url(${
        parsedRightImage.url
      })`;
    }
    return;
  }

function saveRightPicture(imageRightUrl) {
  const savedRightImage = localStorage.getItem("pic_right");
  if (savedRightImage !== null) {
    localStorage.removeItem("pic_right");
  }
  const imageRightObject = {
    url: imageRightUrl
  };
  localStorage.setItem("pic_right", JSON.stringify(imageRightObject));
  loadRightPicture();
  return;
}

function getRightPicture() {
  fetch(UNSPLASH_RIGHT_URL)
    .then(responseRight => responseRight.json())
    .then(jsonRight => {
      const rightImage = jsonRight;
      if (rightImage.urls && rightImage.urls.full) {
        const fullUrl = rightImage.urls.full;
        saveRightPicture(fullUrl);
      } else {
        getRightPicture();
      }
    });
  return;
}

function initRightApp() {
  getRightPicture();
  loadRightPicture();
  return;
}

initRightApp();